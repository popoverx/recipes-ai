'use client';

import { Button } from '@/components/ui/button';
import { IconCrown, IconChevronRight } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function ReferralTrigger({ title = 'Earn free credits' }) {
  const referralLink = 'https://recipes-ai.com/refer/123'; // Replace with actual referral link generation

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer text-orange-700 hover:text-orange-600 flex gap-1.5 items-center hover:underline text-sm'>
          <IconCrown className='h-4 w-4' />
          <span>{title}</span>
          <IconChevronRight className='h-4 w-4' />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <div className='flex items-center justify-between w-full mt-8'>
            <div>❤️ Spread the word </div>
            <div className='cursor-pointer text-orange-700 hover:text-orange-600 flex gap-1.5 items-center hover:underline text-sm'>
              <IconCrown className='h-4 w-4' />
              <span>Upgrade to Pro for more credits</span>
            </div>
          </div>

          <DialogTitle className='text-xl text-zinc-800'>
            Get extra credits by inviting your friends and family to AI Chef
          </DialogTitle>
        </DialogHeader>

        <div className='text-sm text-gray-600'>Your personal referral link</div>
        <div className='flex items-center gap-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Referral Link
            </Label>
            <Input
              className='bg-muted border-none text-zinc-900 font-medium'
              id='link'
              defaultValue={referralLink}
              readOnly
              disabled
            />
          </div>
          <Button
            type='button'
            size='sm'
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              toast.success('Referral link copied to clipboard');
            }}
          >
            Copy Link
          </Button>
        </div>

        <div className='text-base font-medium text-zinc-800 mt-6'>How it works</div>
        <div className='flex flex-col gap-4 mt-1'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center'>
              <span className='text-orange-500'>1</span>
            </div>
            <p className='text-sm text-gray-600'>Share your unique referral link</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center'>
              <span className='text-orange-500'>2</span>
            </div>
            <p className='text-sm text-gray-600'>
              They sign up and get <b>extra 10 credits</b>
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center'>
              <span className='text-orange-500'>3</span>
            </div>
            <p className='text-sm text-gray-600'>
              <b>You get 10 credits</b> once they complete their first recipe!
            </p>
          </div>
        </div>

        <div className='text-center'>
          <Button
            variant='link'
            className='text-xs text-gray-600 mt-4 underline cursor-pointer'
            onClick={() => window.open('https://recipes-ai.com/terms', '_blank')}
          >
            View Terms and Conditions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
