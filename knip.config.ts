import { type KnipConfig } from 'knip'

const config: KnipConfig = {
    ignoreBinaries: [
        'dot', // Needed to visualize results from dependency-cruiser
    ],
}

export default config
