
import * as React from 'react';

import { FloatingSidebar } from '../components/FloatingSidebar';
import { System } from '../components/System';

export function App() {
    return (
        <div>
            <System />
            <FloatingSidebar>
                hi
            </FloatingSidebar>
        </div>
    );
}
