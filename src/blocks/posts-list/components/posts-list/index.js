/**
 * WordPress dependencies
 */
import {useSelect, useDispatch} from "@wordpress/data";
import {useState, useEffect, useCallback} from "@wordpress/element";
import {Button, __experimentalInputControl as InputControl} from "@wordpress/components";

/**
 * Block dependencies
 */
import metadata from '../../block.json';
import Loader from "../loader/index.js";
import PostCard from "../post-card/index.js";

const Index = (props) => {
    const {args} = props;

    const [perPage, setPerPage] = useState(args.perPage);
    const [posts, setPosts] = useState(null);

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
    }, [posts, perPage, args]);

    useEffect(() => {
        if (!request.isResolvingPosts && request.hasResolvedPosts && request.posts?.length) {
            setPosts(request.posts);
        }
    }, [request]);

    return (
        <div>
            <h1>Posts List</h1>
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


export default Index;
