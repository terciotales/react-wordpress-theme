import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import './index.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {useState} from "@wordpress/element";

const Layout = (props) => {
    const {
        className = "layout",
        rowHeight = 30,
        cols = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        posts = [],
        initialLayout = generateLayout(),
        // setLayout,
    } = props;

    const [layouts, setLayouts] = useState({lg: initialLayout});
    const [layout, setLayout] = useState(initialLayout);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [compactType, setCompactType] = useState("vertical");

    const generateDOM = () => {
        return posts.map(function (post, index) {
            return (
                <div key={index}>
                    <span className="text">{post.title.rendered}</span>
                </div>
            );
        });
    }

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint);
    }

    console.log(layouts);

    return (
        <div>
            <ResponsiveReactGridLayout
                {...props}
                width={700}
                layouts={layouts}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={setLayout}
                measureBeforeMount={false}
                compactType={compactType}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div>
    );
}

function generateLayout() {
    return _.map(_.range(0, 25), function (item, i) {
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6),
            w: 2,
            h: 1,
            i: i.toString(),
        };
    });
}

export default Layout;
