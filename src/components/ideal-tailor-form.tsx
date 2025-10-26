'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { getIdealTailor, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, User } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Öneri Alınıyor...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          İdeal Terzimi Bul
        </>
      )}
    </Button>
  );
}

export function IdealTailorForm() {
  const [state, formAction] = useFormState(getIdealTailor, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        title: 'Hata',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.data) {
        // Reset form on success
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card className="w-full shadow-lg">
      <form ref={formRef} action={formAction}>
        <CardContent className="pt-6">
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stylePreferences">Stil Tercihleriniz</Label>
              <Input
                id="stylePreferences"
                name="stylePreferences"
                placeholder="Örn: Modern, klasik, vintage, minimalist"
              />
              {state.errors?.stylePreferences && (
                <p className="text-sm text-destructive">{state.errors.stylePreferences[0]}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="needs">Nasıl bir hizmete ihtiyacınız var?</Label>
              <Textarea
                id="needs"
                name="needs"
                placeholder="Örn: Gelinlik dikimi, takım elbise tadilatı, özel tasarım ceket"
              />
              {state.errors?.needs && (
                <p className="text-sm text-destructive">{state.errors.needs[0]}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Konumunuz</Label>
              <Input id="location" name="location" placeholder="Örn: İstanbul, Kadıköy" />
              {state.errors?.location && (
                <p className="text-sm text-destructive">{state.errors.location[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
        </CardFooter>
      </form>
      {state.data && (
        <div className="p-6 pt-0">
          <div className="mt-4 border-t pt-4">
             <h3 className="text-lg font-semibold font-headline flex items-center mb-2">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Size Özel Önerimiz
            </h3>
            <Card className="bg-primary/10 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-6 w-6" />
                        {state.data.tailorName}
                    </CardTitle>
                    <CardDescription>{state.data.tailorDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-sm mb-1">Neden bu terziyi öneriyoruz?</p>
                    <p className="text-sm text-muted-foreground">{state.data.reasoning}</p>
                </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Card>
  );
}
