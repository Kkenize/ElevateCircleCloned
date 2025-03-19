import React from 'react';
import type { Reply } from '../../utils/discussionsApi';

interface DiscussionReplyProps {
  reply: Reply;
}

export default function DiscussionReply({ reply }: DiscussionReplyProps) {
  const formattedDate = new Date(reply.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pl-8 border-l border-gold-800 mt-4">
      <div className="bg-black/30 rounded-lg p-4">
        <p className="text-sm text-gold-400 mb-2">
          {reply.author_name} replied on {formattedDate}
        </p>
        <p className="text-gray-300">{reply.content}</p>
      </div>
    </div>
  );
}