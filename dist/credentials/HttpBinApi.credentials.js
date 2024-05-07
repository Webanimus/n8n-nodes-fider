"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBinApi = void 0;
class HttpBinApi {
    constructor() {
        this.name = 'httpbinApi';
        this.displayName = 'HttpBin API';
        this.documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
        this.properties = [
            {
                displayName: 'Token',
                name: 'token',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                default: 'https://httpbin.org',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: 'Bearer 5Xj6btki1WWOpdry8np8l5WuaxFs2kNodsYRdYsPFL4fF2b3AfofZJlItvWtKvZp',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'http://localhost/',
                url: '/api/v1',
            },
        };
    }
}
exports.HttpBinApi = HttpBinApi;
//# sourceMappingURL=HttpBinApi.credentials.js.map