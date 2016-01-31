import React, { PropTypes, Component } from 'react';

import Slider from '../../components/slider';
// styles
import styles from './style.scss';

class IndexPage extends Component {
    constructor() {
        super();

        this.state = {
            images: ['http://images3.c-ctrip.com/rk/201312/1920x360b.jpg',
                'http://images3.ctrip.com/destinationad/201601/yl1920_360a.jpg',
                'http://images3.ctrip.com/rk/201511/rh1920.jpg',
                'http://images3.c-ctrip.com/rk/201601/mlh1920.jpg'],
            service: {
                free: {
                    link: 'http://pages.ctrip.com/commerce/promote/201512/flight/1212/zd/index.html',
                    image: 'http://pages.ctrip.com/flight/banners/winter12.jpg'
                },
                map: {
                    link: 'http://events.flights.ctrip.com/intlflight/youyoudongnanya.html#ctm_ref=fli_hp_pref_def_i_1',
                    title: '全世界机票 全信赖携程',
                    subTitle: '国际机票超值优惠'
                }
            },
            toolbox: {
                title: '机票工具箱',
                tools: [{
                    className: styles.order,
                    link: 'FlightQuery.aspx#ctm_ref=fli_hp_tool_def_i_1'
                }, {
                    className: styles.checkin,
                    link: 'http://flights.ctrip.com/domestic/MyToolBox/BookSeatDemo.aspx?param=2#ctm_ref=fli_hp_tool_def_i_1'
                }, {
                    className: styles.refund,
                    link: 'http://my.ctrip.com/Home/Order/FlightOrderList.aspx#ctm_ref=fli_hp_tool_def_i_1'
                }, {
                    className: styles.strategy,
                    link: 'http://flights.ctrip.com/booking/airport-guides.html#ctm_ref=fli_hp_tool_def_i_1'
                }]
            },
            hotTheme: {
                title: '热门主题',
                themes: [{
                    title: '出行保障',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/abroad.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201512/flight/lyx/index.html#ctm_ref=fli_hp_pt_def_i_1'
                }, {
                    title: '热门免签地',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/beach.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201511/flight/sdmqd/index.html#ctm_ref=fli_hp_pt_def_i_2'
                }, {
                    title: '国航专享月',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/ctrip.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201601/flight/gh/index.html#ctm_ref=fli_hp_pt_def_i_3'
                }, {
                    title: '低成本航空',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/lowprice.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201512/flight/dcb/index.html#ctm_ref=fli_hp_pt_def_i_4'
                }, {
                    title: '东南亚特惠',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/se_asia.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201511/flight/yx/index.html#ctm_ref=fli_hp_pt_def_i_5'
                }, {
                    title: '港澳台特惠',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/hkmotw.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201512/flight/gat/index.html#ctm_ref=fli_hp_pt_def_i_6'
                }, {
                    title: '东南亚特惠',
                    image: 'http://pic.c-ctrip.com/fltinternational100913/topic/jpkr.jpg',
                    link: 'http://pages.ctrip.com/commerce/promote/201511/flight/rh/index.html#ctm_ref=fli_hp_pt_def_i_7'
                }]
            },
            roundAirline: {
                title: '往返特惠航线'

            },
            singleAirline: {
                title: '单程特价航线'
            }
        };
    };

    render() {
        return (
            <div>
                <div className={styles.topWrap}>
                    <Slider speed={400} autoplay={false}>
                        {
                            this.state.images.map((image, index) => {
                                return <img key={index} className={styles.image} src={image} />
                            })
                        }
                    </Slider>
                </div>
                <div className={styles.mainWrap}>
                    <aside className={styles.side}>
                        <ul className={styles.service}>
                            <li className={styles.serviceFree}>
                                <a target="_blank" href={this.state.service.free.link}>
                                    <img src={this.state.service.free.image}/>
                                </a>
                            </li>
                            <li className={styles.serviceMap}>
                                <a href={this.state.service.map.link} className={styles.bgIcon} target="_blank">
                                    <b className={styles.bgIcon}></b>
                                    <strong>{this.state.service.map.title}</strong>
                                    <br/>{this.state.service.map.subTitle}
                                </a>
                            </li>
                        </ul>

                        <div className={styles.toolbox}>
                            <h3 className={styles.indexTitle}>{this.state.toolbox.title}</h3>
                            <div className={styles.tools}>
                                {
                                    this.state.toolbox.tools.map((tool, index) => (
                                        <a key={index} target="_blank" href={tool.link} className={tool.className + ' ' + styles.bgIcon}></a>
                                    ))
                                }
                            </div>
                        </div>
                    </aside>
                    <main className={styles.main}>
                        <div className={styles.hotTheme}>
                            <h3 className={styles.indexTitle}>{this.state.hotTheme.title}</h3>
                            <ul className={styles.topicList + ' clearfix'}>
                                {
                                    this.state.hotTheme.themes.map((theme, index) => (
                                        <li key={index} className={index > 4 ? 'hide_on_small' : ''}>
                                            <a target="_blank" href={theme.link} className={styles.topicItem}>
                                                <img src={theme.image} />
                                                <i className={styles.topicAbroad}></i>
                                                <em className={styles.nameBg}></em>
                                                <span className={styles.name}>{theme.title}</span>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={styles.roundAirline}>
                            <h3 className={styles.indexTitle}>{this.state.roundAirline.title}</h3>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default IndexPage;
