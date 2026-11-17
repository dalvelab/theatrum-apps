import {
  Badge,
  chakra,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Markdown } from "ui";

import type { ScheduleEvent } from "../api";
import { getformatDateLocaleTime, isNotVoid, isVoid } from "platform";
import { typeToSchemeMap } from "../model";

// На телефонах модалка на весь экран (size="full"). С viewport-fit=cover
// страница уходит под вырез камеры, поэтому модалка тоже должна закрывать
// его: сплошная подложка + отступы на safe area для шапки, крестика и низа.
const MODAL_SIZE = ["full", "full", "6xl", "3xl", "3xl"];
const SAFE_TOP = "env(safe-area-inset-top)";
const SAFE_BOTTOM = "env(safe-area-inset-bottom)";

const overlayProps = {
  bg: ["white", "white", "blackAlpha.600"],
};

const contentProps = {
  minH: ["100dvh", "100dvh", "auto"],
};

const closeButtonProps = {
  size: "lg" as const,
  top: [`calc(${SAFE_TOP} + 12px)`, `calc(${SAFE_TOP} + 12px)`, 2],
};

const headerPt = [`calc(${SAFE_TOP} + 40px)`, `calc(${SAFE_TOP} + 40px)`, 10];
const bodyPb = [
  `calc(${SAFE_BOTTOM} + 40px)`,
  `calc(${SAFE_BOTTOM} + 40px)`,
  10,
];

interface ModalScheduleProps {
  isOpened: boolean;
  onClose: () => void;
  scheduleEvent?: Pick<ScheduleEvent, "attributes">["attributes"];
}

export const ModalSchedule: React.FC<ModalScheduleProps> = ({
  isOpened,
  onClose,
  scheduleEvent,
}) => {
  if (isVoid(scheduleEvent)) {
    return (
      <Modal isOpen={isOpened} onClose={onClose} size={MODAL_SIZE}>
        <ModalOverlay {...overlayProps} />
        <ModalContent {...contentProps}>
          <ModalHeader
            pt={headerPt}
            display="flex"
            flexDir="column"
            alignItems="flex-start"
            gap={2}
          >
            <Heading>Ошибка</Heading>
          </ModalHeader>
          <ModalCloseButton {...closeButtonProps} />
        </ModalContent>
      </Modal>
    );
  }

  const { title, type, location, date, people, additional_info, timeBadge } =
    scheduleEvent;

  return (
    <Modal
      isOpen={isOpened}
      onClose={onClose}
      size={MODAL_SIZE}
      autoFocus={false}
    >
      <ModalOverlay {...overlayProps} />
      <ModalContent {...contentProps}>
        <ModalHeader
          pt={headerPt}
          flexDir="column"
          alignItems="flex-start"
          gap={2}
        >
          <Flex gap={2}>
            <Badge
              variant="subtle"
              colorScheme={typeToSchemeMap[type]}
              p="4px 10px"
              borderRadius="md"
            >
              {type}
            </Badge>
            {timeBadge && (
              <Badge
                variant="subtle"
                colorScheme="cyan"
                p="4px 10px"
                borderRadius="md"
              >
                время по ЕКБ
              </Badge>
            )}
          </Flex>
          <Heading>{title}</Heading>
        </ModalHeader>
        <ModalCloseButton {...closeButtonProps} />
        <ModalBody pb={bodyPb}>
          <Flex gap={2} flexDir="column">
            <Flex fontWeight={500} fontSize="xl" gap={2}>
              <Text>Время:</Text>
              <Text>{getformatDateLocaleTime(date)}</Text>
            </Flex>
            <Divider />
          </Flex>
          <Flex mt={4} gap={2} flexDir="column">
            <Flex fontWeight={500} fontSize="xl" gap={2}>
              <Text>Локация:</Text>
              <Text>{location}</Text>
            </Flex>
            <Divider />
          </Flex>
          {isNotVoid(people) && people.length > 0 && (
            <Text mt={5} fontSize="2xl" fontWeight={600}>
              Состав
            </Text>
          )}
          {people?.map((person, index) => {
            const workerName = person.worker?.name;

            return (
              <Flex key={index} mt={4} gap={2} flexDir="column">
                <Flex fontSize="lg" gap={isNotVoid(workerName) ? 2 : 0}>
                  <Text>
                    {isNotVoid(person.role) ? `${person.role} - ` : ""}
                  </Text>
                  <Text>{isNotVoid(workerName) ? workerName : ""}</Text>
                </Flex>
                <Divider />
              </Flex>
            );
          })}
          {isNotVoid(additional_info) && additional_info !== "" && (
            <Text mt={5} fontSize="2xl" fontWeight={600}>
              Комментарии
            </Text>
          )}
          <chakra.div w="100%" fontSize="lg" pt={2}>
            <Markdown text={additional_info} />
          </chakra.div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
