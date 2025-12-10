// import { useTocObserver } from '@app/hook/useTockObserver';
import React from 'react';

type Props = {
  htmlContent: string;
};

const ArticleContent: React.FC<Props> = ({ htmlContent }) => {
  return (
    <div className='mt-10'>
      <article className='prose prose-lg max-w-none 
        prose-br:block prose-br:content-[""]
        [&_br]:block [&_br]:content-[""]
        [&_code]:block [&_code]:whitespace-pre-wrap [&_code]:my-2 [&_code_br]:block
        [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:rounded-3xl [&_iframe]:overflow-hidden [&_iframe]:aspect-video [&_iframe]:my-10
        [&_img]:rounded-3xl [&_img]:my-4
        [&_p]:mb-4
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-[#0B60C2]
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-[#0B60C2]
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-6
        [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:mt-4
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
        [&_li]:my-1
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
        [&_strong]:font-bold
        [&_em]:italic'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default ArticleContent;
