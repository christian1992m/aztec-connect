import styled from 'styled-components/macro';
import { useAssetPrice } from 'alt-model';
import { Asset, convertToPriceString, fromBaseUnits } from 'app';
import { ShieldedAssetIcon, Text } from 'components';
import { spacings } from 'styles';

const Table = styled.div`
  padding: ${spacings.l} ${spacings.m};
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 10px 20px;
  align-items: center;
`;

interface RowProps {
  label: string;
  value: bigint;
  asset: Asset;
  assetPrice: bigint;
}

function Row({ asset, value, label, assetPrice }: RowProps) {
  return (
    <>
      <Text text={label} />
      <Text color="grey" size="s" text={`$${convertToPriceString(value, asset.decimals, assetPrice)}`} />
      <ShieldedAssetIcon size="s" asset={asset} />
      <Text size="s" weight="bold" italic text={`${fromBaseUnits(value, asset.decimals)} ${asset.symbol}`} />
    </>
  );
}

interface BreakdownProps {
  asset: Asset;
  amount: bigint;
  fee: bigint;
}

export function Breakdown({ asset, amount, fee }: BreakdownProps) {
  const assetPrice = useAssetPrice(asset.id);

  return (
    <Table>
      <Row label="Amount" value={amount} asset={asset} assetPrice={assetPrice ?? 0n} />
      <Row label="Gas Fee" value={fee} asset={asset} assetPrice={assetPrice ?? 0n} />
      <Row label="Total Cost" value={amount + fee} asset={asset} assetPrice={assetPrice ?? 0n} />
    </Table>
  );
}