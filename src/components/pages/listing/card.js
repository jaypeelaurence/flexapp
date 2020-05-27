import React from 'react';

import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = props => (
	<article className={"cardContainer"}>
		<div className={"img"}>
			<LazyLoadImage src={props.data.thumb} effect={"black-and-white"} alt={`${props.data.title} - ${props.data.tag}`} height={props.data.thumb.height} width={props.data.thumb.width} />
			<div className={"tag"}>
				<h3>{props.data.tag}</h3>
				<div className={"placer"} />
			</div>
		</div>
		<div className={"content"}>
			<h1 className={"title"}>{props.data.title_long}</h1>
			<div className={"link"}>
				<svg id="Colour_Neutral_2._Darker_Grey" data-name="Colour/Neutral/2. Darker Grey" xmlns="http://www.w3.org/2000/svg" width="32" height="2" viewBox="0 0 32 2">
					  	<rect id="Colour_Neutral_2._Darker_Grey_background" data-name="Colour/Neutral/2. Darker Grey background" width="32" height="2" fill="rgba(0,0,0,0)"/>
					  	<rect id="Colour_Neutral_1._Black" data-name="Colour/Neutral/1. Black" width="32" height="2" fill="#3852f7"/>
				</svg>
				<Link to={`/page/${props.data.slug}`}>
					View Case Study
				</Link>
			</div>
		</div>
	</article>
)

export default Card;