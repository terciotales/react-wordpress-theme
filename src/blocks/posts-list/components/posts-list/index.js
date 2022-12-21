/**
 * WordPress dependencies
 */
import {useSelect} from "@wordpress/data";
import {useState, useEffect} from "@wordpress/element";
import {pickBy, isUndefined} from "lodash";

/**
 * Block dependencies
 */
import metadata from '../../block.json';
import Loader from "../loader/index.js";
import PostCard from "../post-card/index.js";

const Index = ({args}) => {
    const {postType, perPage, order, orderBy, categories, status, offset} = args;
    const [posts, setPosts] = useState(null);

    const request = useSelect(select => {
        const {getEntityRecords, hasFinishedResolution, isResolving} = select('core');
        const catIds = categories && 0 < categories.length ? categories.map((cat) => cat.id) : [];

        const args = [
            'postType',
            postType,
            pickBy({
                categories: catIds,
                order: order,
                orderby: orderBy,
                per_page: perPage,
                offset: offset,
                status: status
            }, (value) => !isUndefined(value))
        ];

        return {
            posts: getEntityRecords(...args),
            isResolvingPosts: isResolving('getEntityRecords', args),
            hasResolvedPosts: hasFinishedResolution('getEntityRecords', args),
        };
    }, [posts, args]);

    useEffect(() => {
        if (!request.isResolvingPosts && request.hasResolvedPosts && request.posts?.length) {
            setPosts(request.posts);
        }
    }, [request]);

    return (
        <div>
            <h1>Posts List</h1>
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
