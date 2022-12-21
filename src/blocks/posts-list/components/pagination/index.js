import sprintf from 'sprintf-js';

const Pagination = ({current_page = 1, total_pages = 0, configs_wp_paginate = {}}) => {
    let output_html = '';

    const {
        clickpage,
        previouspage,
        nextpage,
        firstpage,
        lastpage,
        range,
        anchor,
        gap,
        ellipsis_text,
        first_previous
    } = configs_wp_paginate;

    if (element) {
        const clickpage = configs_wp_paginate.clickpage || false;
        const previouspage = configs_wp_paginate.previouspage || '&laquo;';
        const nextpage = configs_wp_paginate.nextpage || '&raquo;';
        const firstpage = configs_wp_paginate.firstpage || 'Primeira';
        const lastpage = configs_wp_paginate.lastpage || 'Última';
        const range = configs_wp_paginate.range || 1;
        const anchor = configs_wp_paginate.anchor ? configs_wp_paginate.anchor.length : 1;
        const gap = configs_wp_paginate.gap || 1;
        const ellipsis_text = configs_wp_paginate.ellipsis_text || '...';
        const first_previous = configs_wp_paginate.hidefirstprevious ? configs_wp_paginate.hidefirstprevious : false;
        const ellipsis = `<li><span class='dots'>${ellipsis_text}</span></li>`;
        const pages = total_pages;
        const min_links = range * 2 + 1;
        const block_min = Math.min(current_page - range, pages - min_links);
        const block_high = Math.max(current_page + range, min_links);
        const left_gap = ((block_min - anchor - gap) > 0);
        const right_gap = ((block_high + anchor + gap) < pages);


        const paginate_loop = (start, max, page = 0, slash = false) => {
            let html = '';
            for (let i = start; i <= max; i++) {
                html += (page == i)
                    ? `<li><a class='page-numbers current' id="${i}">${i}</a></li>`
                    : `<li><a class='page-numbers' id="${i}">${i}</a></li>`;
            }
            return html;
        };


        if (current_page > 1 && !first_previous) {
            output_html += sprintf.sprintf('<li><a id="%s" class="page-numbers">%s</a></li>', 1, firstpage);
        }

        if (current_page > 1) {
            output_html += sprintf.sprintf('<li><a id="%s" class="page-numbers prev">%s</a></li>', current_page - 1, previouspage);
        }

        if (left_gap && !right_gap) {
            output_html += sprintf.sprintf('%s%s%s',
                paginate_loop(1, anchor, 0),
                ellipsis,
                paginate_loop(block_min, pages, current_page));
        } else if (left_gap && right_gap) {
            output_html += sprintf.sprintf('%s%s%s%s%s',
                paginate_loop(1, anchor, 0),
                ellipsis,
                paginate_loop(block_min, block_high, current_page),
                ellipsis,
                paginate_loop((pages - anchor + 1), pages, 0));
        } else if (right_gap && !left_gap) {
            output_html += sprintf.sprintf('%s%s%s',
                paginate_loop(1, block_high, current_page),
                ellipsis,
                paginate_loop((pages - anchor + 1), pages, 0));

        } else {
            output_html += paginate_loop(1, pages, current_page);
        }

        if (current_page < total_pages && !first_previous) {
            output_html += sprintf.sprintf('<li><a id="%s" class="page-numbers">%s</a></li>', total_pages, lastpage);
        }

        if (current_page < total_pages) {
            output_html += sprintf.sprintf('<li><a id="%s" class="page-numbers next">%s</a></li>', current_page + 1, nextpage);
        }

        if (!element.classList.contains('wp-paginate')) {
            if (Number(total_pages) !== 1) element.innerHTML = `<ul class="wp-js-paginate">${output_html}</ul>`;
        } else {
            element.innerHTML = output_html;
        }

        if (typeof clickpage === 'function') {
            // Evento de click
            element.querySelectorAll('.page-numbers').forEach(
                item => item.addEventListener('click', function (e) {
                    e.preventDefault();
                    const page = this.getAttribute('id');

                    if (!this.classList.contains('current') && !isNaN(parseInt(page))) {
                        clickpage(page);
                    }
                })
            );
        }
    }
};
