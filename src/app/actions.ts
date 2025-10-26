'use server';

import { idealTailorRecommendation, type IdealTailorRecommendationInput, IdealTailorRecommendationOutput } from '@/ai/flows/ideal-tailor-recommendation';
import { z } from 'zod';

const FormSchema = z.object({
  stylePreferences: z.string().min(3, { message: 'Stil tercihleri en az 3 karakter olmalıdır.' }),
  needs: z.string().min(3, { message: 'İhtiyaçlarınız en az 3 karakter olmalıdır.' }),
  location: z.string().min(2, { message: 'Konum en az 2 karakter olmalıdır.' }),
});

export type FormState = {
  message: string;
  data?: IdealTailorRecommendationOutput;
  errors?: {
    stylePreferences?: string[];
    needs?: string[];
    location?: string[];
  };
};

export async function getIdealTailor(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    stylePreferences: formData.get('stylePreferences'),
    needs: formData.get('needs'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Lütfen tüm alanları doğru bir şekilde doldurun.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await idealTailorRecommendation(validatedFields.data as IdealTailorRecommendationInput);
    return {
      message: 'İşte size özel terzi önerimiz!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Terzi önerisi alınırken bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}
