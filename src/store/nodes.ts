import { atom, atomFamily, selector, useRecoilState } from 'recoil';

import axios from 'axios';

export interface NodeInfo {
  id: number;
  power: boolean;
  info?: string;
  icon?: React.ReactNode;
  usbMode?: null | 'host' | 'device';
}

export enum APITypes {
  Power = 'power',
  NodeInfo = 'nodeinfo',
  USB = 'usb',
  Other = 'other',
}

const API_URL = 'http://10.215.10.32/api/bmc';

// Power aroms/state

// api/bmc?opt=get&type=power
// http://10.215.10.32/api/bmc?opt=get&type=nodeinfo
const powerState = atom({
  key: 'powerState',
  default: {
    node1: false,
    node2: false,
    node3: false,
    node4: false,
  },
});

interface PowerResponse {
  response: [
    {
      node1: 0 | 1;
      node2: 0 | 1;
      node3: 0 | 1;
      node4: 0 | 1;
    },
  ];
}

export const powerQuery = selector({
  key: 'powerQuery',
  get: async ({ get }) => {
    const request = await axios.get<PowerResponse>(API_URL, {
      params: {
        opt: 'get',
        type: APITypes.Power,
        // "_": Date.prototype.getTime()
      },
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   // Origin: "http://10.215.10.32/",
      //   // Referer: "http://10.215.10.32/",
      // }
    });
    const nodePowers = request.data.response[0];
    return Object.fromEntries(
      Object.entries(nodePowers).map(([key, value]) => [key, Boolean(value)]),
    );
  },
});

// For selected node keyboard actions
export const currentNodeIDState = atom({
  key: 'currentNodeID',
  default: 0,
});

export const nodeFamilyState = atomFamily<NodeInfo, number>({
  key: 'Node',
  default: (param) => ({ id: param, power: false, info: '', icon: undefined }),
});

export const nodeListState = atom<NodeInfo[]>({
  key: 'NodeList',
  default: [],
});

export const nodeListStatsState = selector({
  key: 'NodeListStats',
  get: ({ get }) => {
    const nodeList = get(nodeListState);
    const poweredCount = nodeList.filter((node) => node.power).length;
    const currentHost = nodeList.find((node) => node.usbMode === 'host');
    const currentDevice = nodeList.find((node) => node.usbMode === 'device');

    return {
      poweredCount,
      currentHost,
      currentDevice,
    };
  },
});

export const useNodeState = (nodeId: number) => {
  const nodes = useRecoilState(nodeListState);

  // const togglePower = () => { }

  return {
    // togglePower
  };
};
