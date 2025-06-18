import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { chakra, Grid, Container, Heading } from "@chakra-ui/react";
import { isNotEmpty, isNotVoid } from "platform";
import type { ApiResponse, Meta } from "platform";

import { SwipeGallery } from "@/entities/event";

import { CardAfisha, CardEvent, SEO } from "@/shared/components";
import { getSingleProject } from "@/entities/repertoire/api";
import { Project } from "@/entities/repertoire/models";
import { ProjectHeroSection } from "@/entities/repertoire";
import { Afisha, Event } from "@/entities/event/models";
import { getAfisha, getEvents } from "@/entities/event/api";

export default function ProjectDetails({
  project,
  afisha,
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { title, image, gallery, description } = project.data.attributes;

  return (
    <>
      <SEO>
        <title>{`${title} - Проект Theatrum`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} - Проект Theatrum`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image.data.attributes.url} />
      </SEO>
      <chakra.main mt={20} bgColor="brand.100">
        <ProjectHeroSection
          description={description}
          title={title}
          url={image.data.attributes.url}
        />
        {isNotEmpty(gallery.data) && (
          <chakra.section pt={20} pb={20}>
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <SwipeGallery data={gallery.data} />
            </Container>
          </chakra.section>
        )}
        {isNotVoid(afisha) && isNotEmpty(afisha.data) && (
          <chakra.section pb={20}>
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <Heading as="h4">Ближайшие</Heading>
              <Grid
                gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
                mt={10}
                gap={[6, 6, 6, 10, 10]}
                pb={20}
              >
                {afisha.data.map((event) => (
                  <CardAfisha key={event.id} afisha={event} />
                ))}
              </Grid>
            </Container>
          </chakra.section>
        )}
        {isNotVoid(events) && isNotEmpty(events.data) && (
          <chakra.section pb={20}>
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <Heading as="h4">Спектакли</Heading>
              <Grid
                gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
                mt={10}
                gap={[6, 6, 6, 10, 10]}
                pb={20}
              >
                {events.data.map((event) => (
                  <CardEvent key={event.id} event={event} />
                ))}
              </Grid>
            </Container>
          </chakra.section>
        )}
      </chakra.main>
    </>
  );
}

interface IProps {
  project: ApiResponse<Project, Meta>;
  afisha: ApiResponse<Afisha[], Meta> | null;
  events: ApiResponse<Event[], Meta> | null;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  params,
}) => {
  const project = await getSingleProject({
    id: params?.id?.toString() as string,
  });

  let afisha: ApiResponse<Afisha[], Meta> | null = null;
  let events: ApiResponse<Event[], Meta> | null = null;

  if (isNotVoid(project.data.attributes.project_type.data)) {
    if (
      project.data.attributes.project_type.data.attributes.title === "replica"
    ) {
      afisha = await getAfisha({
        project_type: "replica",
      });
    } else {
      events = await getEvents({
        project_type:
          project.data.attributes.project_type.data.attributes.title,
      });
    }
  }

  return {
    props: { project, afisha, events },
  };
};
