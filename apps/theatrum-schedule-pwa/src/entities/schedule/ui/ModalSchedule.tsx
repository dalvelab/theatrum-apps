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
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

import { ScheduleEvent } from '../api';
import { typeToSchemeMap } from '../model';
import { isNotVoid, isVoid } from '@/shared/utils/mics';
import { getformatDateLocaleTime } from '@/shared/utils/formatDate';

import styles from './styles.module.css';

interface ModalScheduleProps {
  isOpened: boolean;
  onClose: () => void;
  scheduleEvent?: Pick<ScheduleEvent, 'attributes'>['attributes'];
}

export const ModalSchedule: React.FC<ModalScheduleProps> = ({ isOpened, onClose, scheduleEvent }) => {
    if (isVoid(scheduleEvent)) {
      return (
        <Modal isOpen={isOpened} onClose={onClose} size={["full", "full", "6xl", "3xl", "3xl"]}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display="flex" flexDir="column" alignItems="flex-start" gap={2}>
              <Heading>Ошибка</Heading>
            </ModalHeader>
            <ModalCloseButton size="lg" />
          </ModalContent>
        </Modal>
      );
    }

    const { title, type, location, date, people, additional_info, timeBadge } = scheduleEvent;

    console.log(scheduleEvent);

    return (
      <Modal isOpen={isOpened} onClose={onClose} size={["full", "full", "6xl", "3xl", "3xl"]} autoFocus={false}>
        <ModalOverlay display={["none", "none", "none", "block", "block"]}/>
        <ModalContent>
          <ModalHeader pt={10} flexDir="column" alignItems="flex-start" gap={2}>
            <Flex gap={2}>
              <Badge variant='subtle' colorScheme={typeToSchemeMap[type]} p="4px 10px" borderRadius="md">{type}</Badge>
              {timeBadge && (<Badge variant='subtle' colorScheme="cyan" p="4px 10px" borderRadius="md">время по ЕКБ</Badge>)}
            </Flex>
            <Heading>{title}</Heading>
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody pb={10}>
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
            {isNotVoid(people) && people?.length > 0 && <Text mt={5} fontSize="2xl" fontWeight={600}>Состав</Text>}
            {people?.map((person, index) => {
                const workerName = person.worker?.data?.attributes.name;
              
                return (
                  <Flex key={index} mt={4} gap={2} flexDir="column">
                    <Flex fontSize="lg" gap={isNotVoid(workerName) ? 2 : 0}>
                      <Text>{isNotVoid(person.role) ? `${person.role} - ` : ''}</Text>
                      <Text>{isNotVoid(workerName) ? workerName : ''}</Text>
                    </Flex>
                    <Divider />
                  </Flex>
                )
            })}
            {isNotVoid(additional_info) && additional_info !== "" && <Text mt={5} fontSize="2xl" fontWeight={600}>Комментарии</Text>}
            <chakra.div w="100%" fontSize="lg" pt={2}>
              <ReactMarkdown className={styles.description}>
                {additional_info}
              </ReactMarkdown>
            </chakra.div>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }