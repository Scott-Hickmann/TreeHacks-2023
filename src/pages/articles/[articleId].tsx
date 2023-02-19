import { Box } from '@chakra-ui/react';
import { Content } from 'client/components/content';
import Layout from 'client/components/layout';
import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ArticlePageProps {
  content: MDXRemoteSerializeResult;
}

export default function ArticlePage({ content }: ArticlePageProps) {
  return (
    <Layout title="Home" description="Home">
      <Box m={{ base: 6, md: 8 }}>
        <Content content={content} />
      </Box>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const articleIds = fs.readdirSync('src/common/content');
  return {
    paths: articleIds.map((articleId) => ({
      params: { articleId: articleId.split('.')[0] }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params
}) => {
  const articleId = String(params?.articleId);
  try {
    const mdx = fs.readFileSync(`src/common/content/${articleId}.mdx`, 'utf8');
    const content = await serialize(mdx);
    return {
      props: { content }
    };
  } catch (err) {
    return { notFound: true };
  }
};
