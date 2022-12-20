/**
 * WordPress dependencies
 */
import {useSelect, useDispatch} from "@wordpress/data";
import {useState, useEffect, useCallback} from "@wordpress/element";
import {Button, __experimentalInputControl as InputControl} from "@wordpress/components";

/**
 * Block dependencies
 */
import metadata from '../block.json';
import Loader from "./loader";
import PostCard from "./post-card";

const PostsList = (props) => {
    const [posts, setPosts] = useState(null);
    const [perPage, setPerPage] = useState(props.perPage);

    const request = useSelect(select => {
        const {getEntityRecords, hasFinishedResolution, isResolving} = select('core');

        const args = [
            'postType',
            'post',
            {per_page: perPage, status: ['publish', 'draft']},
        ];

        return {
            posts: getEntityRecords(...args),
            isResolvingPosts: isResolving('getEntityRecords', args),
            hasResolvedPosts: hasFinishedResolution(
                'getEntityRecords',
                args
            ),
        };
    }, [posts, perPage, props]);


    useEffect(() => {
        if (!request.isResolvingPosts && request.hasResolvedPosts && request.posts?.length) {
            setPosts(request.posts);
        }
    }, [request]);

    const refreshPosts = useCallback(() => {

    }, []);

    return (
        <div>
            <h1>Posts List</h1>
            <Button isPrimary onClick={refreshPosts}>Recarregar</Button>
            <InputControl
                label="Posts por página"
                value={perPage}
                type="number"
                onChange={perPage => setPerPage(perPage)}
            />
            {request.isResolvingPosts &&
                <Loader/>
            }
            {request.hasResolvedPosts && posts?.length > 0 &&
                <div className="posts-list">
                    {posts?.map((post, index) => {
                        return (
                            <PostCard post={post}/>
                        )
                    })}
                </div>
            }
            {request.hasResolvedPosts && posts?.length === 0 &&
                <p>Nenhum post encontrado</p>
            }
            {request.hasResolvedPosts && !posts &&
                <p>Erro ao carregar posts</p>
            }
        </div>
    )
}


export default PostsList;
