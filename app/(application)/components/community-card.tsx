import {
  Body,
  Button,
  Card,
  Flex,
  Heading,
  Subtitle,
  UppercaseHeading,
} from 'craftbook';
import Link from 'next/link';

export type CommunityUserType = {
  username: string;
  role: 'member' | 'admin';
};

export interface CommunityCardProps {
  id: string;
  communityName: string;
  title: string;
  description?: string;
  users: CommunityUserType[];
  category: string;
  logo?: string;
}

export default function CommunityCard({
  id,
  communityName,
  title,
  description,
  users,
}: CommunityCardProps) {
  return (
    <Link href={`/comm/${communityName}`} className="h-full">
      <Card className="w-[280px] h-full">
        <Body>{title}</Body>
        {description && (
          <Subtitle size="xs" className="mt-1 truncate">
            {description}
          </Subtitle>
        )}
        <Subtitle className="mt-2" size="xs">
          {users?.length} members
        </Subtitle>
      </Card>
    </Link>
  );
}
