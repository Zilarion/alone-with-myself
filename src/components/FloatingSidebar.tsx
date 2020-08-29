import * as React from 'react';

export function FloatingSidebar({ children }: React.Props<{}>) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                padding: 0,
                color: 'white',
            }}
        >
            { children }
        </div>
    );
}
