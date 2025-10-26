'use server';

/**
 * @fileOverview Provides personalized tailor recommendations based on user style preferences and needs.
 *
 * - idealTailorRecommendation - A function that recommends an ideal tailor based on user input.
 * - IdealTailorRecommendationInput - The input type for the idealTailorRecommendation function.
 * - IdealTailorRecommendationOutput - The return type for the idealTailorRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdealTailorRecommendationInputSchema = z.object({
  stylePreferences: z
    .string()
    .describe('The user style preferences, e.g., modern, classic, vintage.'),
  needs: z.string().describe('The specific needs of the user for the project, e.g., wedding dress, suit alteration, custom jeans.'),
  location: z.string().describe('The location of the user.'),
});
export type IdealTailorRecommendationInput = z.infer<typeof IdealTailorRecommendationInputSchema>;

const IdealTailorRecommendationOutputSchema = z.object({
  tailorName: z.string().describe('The name of the recommended tailor.'),
  tailorDescription: z.string().describe('A brief description of the tailor and their expertise.'),
  reasoning: z.string().describe('The reasoning behind the tailor recommendation based on user preferences and needs.'),
});
export type IdealTailorRecommendationOutput = z.infer<typeof IdealTailorRecommendationOutputSchema>;

export async function idealTailorRecommendation(input: IdealTailorRecommendationInput): Promise<IdealTailorRecommendationOutput> {
  return idealTailorRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'idealTailorRecommendationPrompt',
  input: {schema: IdealTailorRecommendationInputSchema},
  output: {schema: IdealTailorRecommendationOutputSchema},
  prompt: `You are an expert tailor recommendation agent. Based on the user's style preferences, needs, and location, you will recommend an ideal tailor.

Style Preferences: {{{stylePreferences}}}
Needs: {{{needs}}}
Location: {{{location}}}

Consider the tailor's expertise, experience, and customer reviews when making your recommendation. Provide a reasoning for your choice.

Output should be in JSON format.`,
});

const idealTailorRecommendationFlow = ai.defineFlow(
  {
    name: 'idealTailorRecommendationFlow',
    inputSchema: IdealTailorRecommendationInputSchema,
    outputSchema: IdealTailorRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
