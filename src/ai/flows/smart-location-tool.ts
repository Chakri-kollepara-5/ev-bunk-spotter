// 'use server';
/**
 * @fileOverview An AI-powered tool that recommends nearby EV bunks based on popularity, availability, and ratings.
 *
 * - recommendEvBunks - A function that recommends nearby EV bunks.
 * - RecommendEvBunksInput - The input type for the recommendEvBunks function.
 * - RecommendEvBunksOutput - The return type for the recommendEvBunks function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendEvBunksInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The current location of the user (e.g., latitude, longitude).'),
  searchRadius: z
    .number()
    .describe('The radius (in kilometers) within which to search for EV bunks.'),
  numberOfRecommendations: z
    .number()
    .describe('The number of EV bunk recommendations to provide.'),
});
export type RecommendEvBunksInput = z.infer<typeof RecommendEvBunksInputSchema>;

const RecommendEvBunksOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      bunkName: z.string().describe('The name of the EV bunk.'),
      address: z.string().describe('The address of the EV bunk.'),
      availability: z.string().describe('The slot availability information.'),
      rating: z.number().describe('The average user rating of the EV bunk.'),
      popularity: z.number().describe('The popularity score of the EV bunk'),
    })
  ).describe('A list of recommended EV bunks based on popularity, availability, and ratings.'),
});
export type RecommendEvBunksOutput = z.infer<typeof RecommendEvBunksOutputSchema>;

export async function recommendEvBunks(input: RecommendEvBunksInput): Promise<RecommendEvBunksOutput> {
  return recommendEvBunksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEvBunksPrompt',
  input: {schema: RecommendEvBunksInputSchema},
  output: {schema: RecommendEvBunksOutputSchema},
  prompt: `You are an AI assistant designed to recommend nearby EV bunks based on factors like popularity, availability, and ratings.

  User Location: {{{userLocation}}}
  Search Radius: {{{searchRadius}}} km
  Number of Recommendations: {{{numberOfRecommendations}}}

  Provide a list of recommended EV bunks with bunk name, address, availability, rating and popularity.`,
});

const recommendEvBunksFlow = ai.defineFlow(
  {
    name: 'recommendEvBunksFlow',
    inputSchema: RecommendEvBunksInputSchema,
    outputSchema: RecommendEvBunksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
