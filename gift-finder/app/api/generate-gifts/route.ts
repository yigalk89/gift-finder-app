import { NextRequest, NextResponse } from 'next/server';
import { FormData, Gift } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    // Validate API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Construct the prompt with all user inputs
    const prompt = constructPrompt(formData);

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Extract the text content from the response
    const textContent = data.content[0].text;

    // Parse the JSON response (handle markdown code blocks)
    const gifts = parseGiftsResponse(textContent);

    return NextResponse.json({ gifts });
  } catch (error) {
    console.error('Error generating gifts:', error);
    return NextResponse.json(
      { error: 'Failed to generate gift recommendations' },
      { status: 500 }
    );
  }
}

function constructPrompt(formData: FormData): string {
  const occasion = formData.customOccasion || formData.occasion;

  return `You are a gift recommendation expert. Based on the following information, suggest 6 thoughtful and personalized gift ideas.

RECIPIENT INFORMATION:
- Relationship: ${formData.relationship}
- Location: ${formData.location}
- Age Range: ${formData.ageRange}
- Interests: ${formData.interests.join(', ')}
- Personality Traits: ${formData.personalityTraits.join(', ')}

GIFT PREFERENCES:
- Budget: ${formData.budget}
- Gift Type: ${formData.giftType}
- Occasion: ${occasion}

INSTRUCTIONS:
Please suggest 6 diverse and thoughtful gift ideas that match the recipient's profile and preferences. Each gift should be available for purchase and appropriate for the budget range specified.

IMPORTANT: Respond ONLY with a valid JSON array of exactly 6 gift recommendations. Do not include any markdown formatting or code blocks. Use this exact structure:

[
  {
    "name": "Gift Name",
    "price": "$XX",
    "type": "tangible or experience",
    "description": "Brief description explaining why this gift is perfect",
    "shop": "Where to buy this gift",
    "category": "Category name",
    "emoji": "🎁"
  }
]

Remember: Return ONLY the JSON array, no other text or formatting.`;
}

function parseGiftsResponse(text: string): Gift[] {
  try {
    // Remove markdown code blocks if present
    let jsonText = text.trim();

    // Remove ```json and ``` markers
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    // Parse the JSON
    const gifts: Gift[] = JSON.parse(jsonText.trim());

    // Validate we have exactly 6 gifts
    if (!Array.isArray(gifts) || gifts.length !== 6) {
      throw new Error('Invalid number of gifts returned');
    }

    // Validate each gift has required fields
    gifts.forEach((gift, index) => {
      if (!gift.name || !gift.price || !gift.description || !gift.shop) {
        throw new Error(`Gift ${index} is missing required fields`);
      }
    });

    return gifts;
  } catch (error) {
    console.error('Error parsing gifts response:', error);
    console.error('Raw response:', text);
    throw new Error('Failed to parse gift recommendations');
  }
}
