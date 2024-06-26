
function WaterPumpSvg (props)
{
    return(<svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 256 256"
            width={props.width}
            height={props.height}
            length={props.length}
        >
            <path
                d="M246 105.3c-2.8 4.8-5.9 6.6-9.8 5.6-4.2-1.1-6-4.1-6-10 0-13.1.1-26.3-.1-39.4-.1-4.8 1.4-8.3 5.9-10.3h4.2c2.6 1.2 4.5 3.2 5.8 5.8v48.3ZM58.6 150.7c-1-5.2-2.4-10.1-2.7-15.1-2.2-28.4 8.4-50.8 31.9-67 11.7-8 24.9-11.6 39-11.7 25.5-.1 51.1 0 76.6 0 13 0 22.1 9.1 22 22.1 0 3.7 0 7.4-.8 11-2.1 9.3-10.2 15.7-19.8 15.9-3.3.1-6.7 0-10.3 0 .7 2.8 1.4 5.4 1.9 8 6.1 28.6-6.2 58-30.7 74.1-11.9 7.8-25.1 11.6-39.3 11.7-24.5.1-49 0-73.5 0-13.5 0-22.5-9-22.4-22.5 0-3.5 0-7.1.8-10.4 2.1-9.4 10.3-15.8 20-16 2.5-.2 4.9-.1 7.3-.1Zm2-22.5c0 36.5 29.6 66.2 66.1 66.2 36.3 0 66-29.5 66.1-65.6.1-36.8-29.4-66.5-66-66.6-36.5-.1-66.2 29.5-66.2 66Zm93.8-66c.7.5.8.7.9.7 16.8 7.6 29 19.7 36.6 36.4.3.6 1.4 1.2 2.2 1.3 3.6.1 7.2.1 10.8 0 7.1-.2 13.3-5.1 14.7-12 .6-3.1.5-6.5.5-9.7 0-10-6.7-16.7-16.6-16.7h-49.1ZM98.5 194.4c0-.1.1-.3.1-.4l-1.8-.9c-13.8-6.5-24.6-16.3-32.2-29.6-1.4-2.5-2.4-6-4.6-7.2-2.3-1.3-5.8-.3-8.8-.3-7.2.1-13.5 5.1-14.9 12.1-.6 3.1-.5 6.3-.5 9.4 0 10.2 6.6 16.9 16.7 16.9h46ZM10 150.7c2.8-4.8 5.9-6.6 9.8-5.6 4.2 1.1 6 4.1 6 10 0 13.1-.1 26.3.1 39.4.1 4.8-1.4 8.3-5.9 10.3h-4.2c-2.6-1.2-4.6-3.2-5.8-5.8v-48.3Z"/>
            <g>
                <path
                    d="M118.2 128.1c0-5 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1-9.1-4-9.1-9.1Zm41-35.4L141.4 111c-3.2-2.6-7.1-4.4-11.3-4.9v-27c-30.9 0-38.2 17.2-38.2 17.2l18 17.5c-2.8 3.3-4.6 7.5-5.2 12H78.3c0 30.9 17.2 38.2 17.2 38.2l17.6-18c3.3 2.6 7.4 4.4 11.9 4.8v26.5c30.9 0 38.2-17.2 38.2-17.2l-18.3-17.9c2.5-3.2 4.1-7 4.6-11.3h27c-.1-30.9-17.3-38.2-17.3-38.2Zm-31.9 49.1c-7.5 0-13.7-6.1-13.7-13.7 0-7.5 6.1-13.7 13.7-13.7 7.5 0 13.7 6.1 13.7 13.7s-6.1 13.7-13.7 13.7Zm22.5-6.4h3.2v9.9h-3.2v-9.9Zm5.9-1.2h3.6v12.4h-3.6v-12.4Zm6.9-1.6h4.7v15.6h-4.7v-15.6Zm7.9-.5h4.8v16.6h-4.8v-16.6Zm-60.6 18.7h9.9v3.2h-9.9v-3.2Zm-1.3 5.9H121v3.6h-12.4v-3.6Zm-1.6 6.9h15.6v4.7H107v-4.7Zm-.5 7.9h16.6v4.8h-16.6v-4.8Zm-5.4-60.6h3.2v9.9h-3.2v-9.9Zm-6.3-1.2h3.6v12.4h-3.6v-12.4Zm-7.9-1.6h4.7v15.6h-4.7v-15.6Zm-8-.5h4.8v16.6h-4.8v-16.6Zm56.5-4.4h9.9v3.2h-9.9v-3.2Zm-1.3-6.3h12.4v3.6h-12.4v-3.6Zm-1.6-8h15.6v4.7h-15.6v-4.7Zm-.5-8h16.6v4.8H132v-4.8Z"/>
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    calcMode="linear"
                    dur={props.duration||"20s"}
                    from="0 127.5 128"
                    repeatCount="indefinite"
                    to="360 127.5 128"
                    type="rotate"
                />
            </g>
        </svg>
    );
}

export default WaterPumpSvg
