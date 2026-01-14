"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorAdapter = void 0;
class SimulatorAdapter {
    static toDomain(item) {
        const { id, attributes } = item;
        return {
            id,
            title: attributes.title,
            slug: attributes.slug,
            description: attributes.description,
            type: attributes.type,
            parameters: attributes.parameters,
            seo: attributes.seo,
            aeoBlocks: attributes.aeoBlocks,
        };
    }
}
exports.SimulatorAdapter = SimulatorAdapter;
//# sourceMappingURL=simulator.adapter.js.map