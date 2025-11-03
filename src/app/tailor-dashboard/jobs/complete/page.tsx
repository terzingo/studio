
import { Suspense } from 'react';
import CompleteJobForm from './complete-job-form';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
    return (
        <div className="mx-auto grid w-full max-w-4xl gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

export default function CompleteJobPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CompleteJobForm />
    </Suspense>
  );
}
