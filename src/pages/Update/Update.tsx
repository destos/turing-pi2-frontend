import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Upgrade() {
  return (
    <>
      <Meta title="upgrade firmware" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Upgrade Firmware</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Upgrade;
