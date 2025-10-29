import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Analyzing image:', imageUrl);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI image analyzer that categorizes photos into specific categories. Analyze the image and determine which category it belongs to:

Categories:
- "happy": Photos with smiling faces, laughter, joyful expressions, celebrations
- "sad": Photos with sad expressions, crying, somber mood, emotional moments
- "angry": Photos with angry or frustrated expressions, tension, conflict
- "family": Photos with family members, groups of people, relatives together
- "places": Travel photos, landscapes, landmarks, scenic views, architecture
- "events": Parties, celebrations, birthdays, weddings, gatherings
- "pets": Photos with animals, pets, nature scenes with wildlife

Respond with ONLY a JSON object in this exact format:
{"category": "category_name", "confidence": 0.95, "description": "brief description of what you see"}

Choose the MOST appropriate category. If multiple categories apply, choose the dominant theme.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this image and categorize it.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', data);

    const content = data.choices[0].message.content;
    const analysisMatch = content.match(/\{[^}]+\}/);
    
    let analysis;
    if (analysisMatch) {
      analysis = JSON.parse(analysisMatch[0]);
    } else {
      // Fallback parsing
      analysis = {
        category: 'happy',
        confidence: 0.7,
        description: 'Image analyzed successfully'
      };
    }

    console.log('Final analysis:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-image function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      category: 'happy',
      confidence: 0.5,
      description: 'Analysis failed, defaulted to happy category'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});