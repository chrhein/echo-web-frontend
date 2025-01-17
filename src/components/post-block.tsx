import { Center, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { Post } from '../lib/api';
import ButtonLink from './button-link';
import PostPreview from './post-preview';
import Section from './section';

const PostBlock = ({ posts, error }: { posts: Array<Post> | null; error: string | null }): JSX.Element => {
    return (
        <Section data-testid="post-block">
            <Center>
                <Heading p="1rem" mb=".5em" sizes={['xs', 'md']}>
                    Innlegg
                </Heading>
            </Center>
            {posts && !error && posts.length <= 0 && (
                <Center>
                    <Text>Ingen Innlegg</Text>
                </Center>
            )}
            {posts && !error && (
                <Stack direction={['column', null, null, null, 'row']} spacing={5} divider={<StackDivider />} w="100%">
                    {posts.map((post: Post) => {
                        return <PostPreview key={post.slug} post={post} />;
                    })}
                </Stack>
            )}
            {!posts && error && <Text>{error}</Text>}
            <ButtonLink text="Se mer" linkTo="/posts" />
        </Section>
    );
};

export default PostBlock;
