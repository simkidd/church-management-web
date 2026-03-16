"use client"
import DOMPurify from "isomorphic-dompurify";
import { useMemo } from "react";

const TextContentRenderer = ({ content }: { content: string }) => {
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content),
    [content],
  );

  return (
    <div
      className="
      prose prose-lg dark:prose-invert max-w-full
      wrap-break-word

      [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-4 [&_h1]:mt-6
      [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5
      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
      [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-6 [&_h4]:mt-4 [&_h4]:leading-[30px]

      [&_p]:mb-4 [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:text-[15px] [&_p]:leading-7

      [&_ul]:ml-6 [&_ul]:list-disc [&_ul_li]:mb-2 [&_li]:text-[15px]
      [&_ol]:ml-6 [&_ol]:list-decimal [&_ol_li]:mb-2

      [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 dark:[&_blockquote]:border-gray-600
      [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-gray-400

      [&_a]:text-blue-600 [&_a]:hover:underline

      [&_code]:bg-gray-100 [&_code]:text-red-600 [&_code]:px-1 [&_code]:rounded
      [&_pre]:bg-gray-800 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto

      [&_img]:max-w-full [&_img]:rounded [&_img]:my-4
    "
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default TextContentRenderer;
