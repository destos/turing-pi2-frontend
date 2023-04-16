import { useRecoilValue } from 'recoil';

import DevicesIcon from '@mui/icons-material/Devices';
import { Container, Grid } from '@mui/material';

import Meta from '@/components/Meta';
import { NodeInfo, nodeListState, powerQuery } from '@/store/nodes';

import Node from './Node';

const nodes: NodeInfo[] = [
  { id: 1, power: true, info: 'ubuntu-22.22', icon: <DevicesIcon /> },
  { id: 2, power: false, info: 'ubuntu-22.22', usbMode: 'host' },
  { id: 3, power: false, info: 'ubuntu-22.22' },
  { id: 4, power: true, info: 'ubuntu-22.22' },
];

// IDEAS: have a usb host icon that shows which node has access to the switchable usb port.
// Then also allow them to switch to that node from the context menu.
// Add keyboard shortcuts for everything
// Power toggle has confirm, as well as the shortcut opens up confirm dialog.

function Nodes() {
  const nodeList = useRecoilValue(nodeListState);
  const power = useRecoilValue(powerQuery);
  console.log(power);
  return (
    <>
      <Meta title="Nodes" />
      <Container>
        <Grid container spacing={2} my={3}>
          {nodeList.map((node) => (
            <Grid item key={node.id} xs={12} md={6}>
              <Node node={node} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Nodes;
