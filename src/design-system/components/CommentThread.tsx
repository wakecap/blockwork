import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faThumbsUp,
  faThumbsDown,
  faEllipsisH,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  replies?: Comment[];
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface CommentThreadProps {
  comments: Comment[];
  onLike?: (commentId: string) => void;
  onDislike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  onReport?: (commentId: string) => void;
  maxReplies?: number;
  showReplies?: boolean;
  className?: string;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  onLike,
  onDislike,
  onReply,
  onEdit,
  onDelete,
  onReport,
  maxReplies = 3,
  showReplies = true,
  className = "",
}) => {
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [editingComment, setEditingComment] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");
  const [editContent, setEditContent] = React.useState("");

  const handleReply = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyContent("");
    } else {
      setReplyingTo(commentId);
      setReplyContent("");
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim() && onReply) {
      onReply(commentId, replyContent.trim());
      setReplyingTo(null);
      setReplyContent("");
    }
  };

  const handleEdit = (comment: Comment) => {
    if (editingComment === comment.id) {
      setEditingComment(null);
      setEditContent("");
    } else {
      setEditingComment(comment.id);
      setEditContent(comment.content);
    }
  };

  const handleSubmitEdit = (commentId: string) => {
    if (editContent.trim() && onEdit) {
      onEdit(commentId, editContent.trim());
      setEditingComment(null);
      setEditContent("");
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-8 border-l-2 border-neutral-200 pl-4" : ""}`}>
      <div className="flex space-x-3 mb-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.avatar ? (
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-neutral-600">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-neutral-200 rounded-lg p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-neutral-900">{comment.author}</span>
                <span className="text-xs text-neutral-500">{formatTime(comment.timestamp)}</span>
                {comment.isEdited && <span className="text-xs text-neutral-400">(edited)</span>}
                {comment.isDeleted && <span className="text-xs text-neutral-400">(deleted)</span>}
              </div>

              {/* Actions Menu */}
              <div className="relative">
                <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                  <FontAwesomeIcon icon={faEllipsisH} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!comment.isDeleted ? (
              <div className="text-sm text-neutral-700 mb-3">
                {editingComment === comment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Edit your comment..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSubmitEdit(comment.id)}
                        className="px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded hover:bg-neutral-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{comment.content}</p>
                )}
              </div>
            ) : (
              <div className="text-sm text-neutral-400 italic mb-3">
                This comment has been deleted.
              </div>
            )}

            {/* Actions */}
            {!comment.isDeleted && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Like */}
                  <button
                    onClick={() => onLike?.(comment.id)}
                    className={`flex items-center space-x-1 text-xs transition-colors ${
                      comment.isLiked ? "text-blue-600" : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </button>

                  {/* Dislike */}
                  <button
                    onClick={() => onDislike?.(comment.id)}
                    className={`flex items-center space-x-1 text-xs transition-colors ${
                      comment.isDisliked
                        ? "text-red-600"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} className="w-3 h-3" />
                    <span>{comment.dislikes}</span>
                  </button>

                  {/* Reply */}
                  {onReply && (
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faReply} className="w-3 h-3" />
                      <span>Reply</span>
                    </button>
                  )}
                </div>

                {/* Edit/Delete */}
                <div className="flex items-center space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  {onReport && (
                    <button
                      onClick={() => onReport(comment.id)}
                      className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faFlag} className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 ml-8">
              <div className="space-y-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Write a reply..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    className="px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded hover:bg-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.slice(0, maxReplies).map((reply) => renderComment(reply, true))}
              {comment.replies.length > maxReplies && (
                <button className="text-xs text-primary-600 hover:text-primary-700 ml-8">
                  Show {comment.replies.length - maxReplies} more replies
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {comments.map((comment) => renderComment(comment))}
    </div>
  );
};
