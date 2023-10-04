import Image from 'next/image';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Link, chakra, Heading, Container, Flex, Text } from '@chakra-ui/react'
import { Markdown } from 'ui';
import { getGenetiveRusMonth, isNotVoid } from 'platform';
import type { ApiResponse, Meta } from 'platform';

import { getSinglelNews } from '@/entities/post/api';
import { SEO } from '@/shared/components';
import type { News } from '@/entities/post/models';

export default function NewsDetails({ post } : InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { image, title, description, createdAt, source } = post.data.attributes;

  const date = createdAt.toString()
  const publish_date = isNotVoid(source) && isNotVoid(source.publish_date) ? source?.publish_date.toString() : '';

  return (
    <>
      <SEO>
        <title>{`${title} - Новости Theatrum`}</title>
        <meta name="description" content={description.slice(0, 160) + '...'} />
        <meta property="og:title" content={`${title} - Новости Theatrum`} />
        <meta property="og:description" content={description.slice(0, 160) + '...'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`} />
      </SEO>
      <chakra.main mt={20} bgColor="brand.100">
        <Container pt={10} pb={20} maxWidth="container.xl" minH="100vh" h="auto" display="flex" flexDir="column" zIndex={1} pos="relative">
          <Flex gap={7} alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]} flexDir={["column", "column", "column", "row", "row"]}>
            <chakra.div 
              pos="relative" 
              minW={["100%", "100%", "100%", "520px", "640px"]} 
              height={["320px", "400px", "520px", "400px", "460px"]}>
                <Image
                src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
                alt={title}
                fill
                style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
            </chakra.div>
            <Flex flexDir="column" gap={3}>
              <Text color="brand.300" fontSize="lg">
              {`${Number(date.substring(8, 10))} ${getGenetiveRusMonth(Number(date.substring(5, 7)))}, ${date.substring(0, 4)}`}
              </Text>
              <Heading as="h1" fontSize={["2xl", "3xl", "3xl", "3xl", "3xl"]} fontWeight="medium" color="gray.900">{title}</Heading>
              {isNotVoid(source) && (
                <Text fontSize="sm">
                  Опубликовано {" "}
                  {publish_date && `${Number(publish_date.substring(8, 10))} ${getGenetiveRusMonth(Number(publish_date.substring(5, 7)))}, ${publish_date.substring(0, 4)}`}
                  {" "}
                  в
                  {" "}
                  <Link color="brand.200" href={source.link} target='_blank'>
                    {source.title}
                  </Link>
                </Text>
              )}
            </Flex>
          </Flex>
          <chakra.div mt={[5, 6, 7, 7, 7]} w={["100%", "100%", "100%", "container.lg", "container.lg"]} fontSize="lg">
            <Markdown text={description} />
          </chakra.div>
        </Container>
      </chakra.main>
    </>
  )
}

interface IProps {
  post: ApiResponse<News, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ params }) => {
  const post = await getSinglelNews({ id: params?.slug?.toString().split('-')[0] })

  return {
    props: { post }
  }
};