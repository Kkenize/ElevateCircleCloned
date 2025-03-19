import { supabase } from './supabase';

export interface Reply {
  id: string;
  discussion_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Discussion {
  id: string;
  author_name: string;
  title: string;
  content: string;
  created_at: string;
  flagged: boolean;
  likes: number;
  replies?: Reply[];
}

export async function fetchDiscussions() {
  const { data, error } = await supabase
    .from('discussions')
    .select(`
      *,
      replies:discussion_replies(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching discussions:', error);
    throw error;
  }

  return data as Discussion[];
}

export async function addDiscussion(authorName: string, title: string, content: string) {
  // Simple content moderation
  const forbiddenWords = ["badword1", "badword2", "inappropriate"];
  const hasForbiddenWords = forbiddenWords.some(word =>
    content.toLowerCase().includes(word) || title.toLowerCase().includes(word)
  );

  if (hasForbiddenWords) {
    throw new Error("Post contains inappropriate language.");
  }

  const { data, error } = await supabase
    .from('discussions')
    .insert([{
      author_name: authorName,
      title,
      content,
      flagged: false,
      likes: 0
    }]);

  if (error) {
    console.error('Error adding discussion:', error);
    throw error;
  }

  return data;
}

export async function likeDiscussion(discussionId: string) {
  const { error } = await supabase.rpc('increment_discussion_likes', {
    discussion_id: discussionId
  });

  if (error) {
    console.error('Error liking discussion:', error);
    throw error;
  }
}

export async function addReply(discussionId: string, authorName: string, content: string) {
  const { data, error } = await supabase
    .from('discussion_replies')
    .insert([{
      discussion_id: discussionId,
      author_name: authorName,
      content
    }]);

  if (error) {
    console.error('Error adding reply:', error);
    throw error;
  }

  return data;
}