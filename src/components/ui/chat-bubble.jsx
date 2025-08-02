import * as React from 'react';
import { cn } from '@/lib/utils';

const ChatBubble = React.forwardRef(
  ({ className, role = 'assistant', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'max-w-[80%] w-fit rounded-2xl p-4',
        role === 'user' ? 'bg-zinc-100 text-zinc-900' : 'bg-none text-gray-900',
        className
      )}
      {...props}
    >
      <ChatBubbleHeader role={role} />
      {children}
    </div>
  )
);
ChatBubble.displayName = 'ChatBubble';

const ChatBubbleHeader = React.forwardRef(({ className, role = 'assistant', ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center mb-2', className)} {...props}>
    {role === 'assistant' && <span className='font-semibold text-sm text-gray-700'>Chef</span>}
    {props.children}
  </div>
));
ChatBubbleHeader.displayName = 'ChatBubbleHeader';

const ChatBubbleContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('whitespace-pre-wrap', className)} {...props} />
));
ChatBubbleContent.displayName = 'ChatBubbleContent';

const ChatBubbleTool = React.forwardRef(({ className, toolType, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-2 p-3 rounded-xl',
      toolType === 'searchRecipe' ? 'bg-orange-50/50' : 'bg-gray-50/50',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ChatBubbleTool.displayName = 'ChatBubbleTool';

export { ChatBubble, ChatBubbleHeader, ChatBubbleContent, ChatBubbleTool };
