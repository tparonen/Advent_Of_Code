import * as d3 from 'd3';
import {JSDOM} from 'jsdom';
import {AsteroidMap} from "./map";

const dom = new JSDOM();

export const drawAsteroidMapToSvg = (asteroidMap: AsteroidMap): void => {
    const body = d3.select(dom.window.document.body);

    const svg = body.append('svg');

    const node = body.node();
};