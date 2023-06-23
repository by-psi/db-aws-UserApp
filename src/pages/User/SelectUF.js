import React from 'react';
import { Picker as RNPickerSelect } from '@react-native-picker/picker';
import { PickerView } from './styles';

export default function SelectUF({onChange, Uf}) {
  return (
    <PickerView>
      <RNPickerSelect 
        selectedValue={ Uf }
        onValueChange={(valor) => onChange(valor)}
        uf={ Uf }
      >
        <RNPickerSelect.Item label='AC Acre' value='AC' />
        <RNPickerSelect.Item label='AL Alagoas' value='AL' />
        <RNPickerSelect.Item label='AP Amapá' value='AP' />
        <RNPickerSelect.Item label='AM Amazonas' value='AM' />
        <RNPickerSelect.Item label='BA Bahia' value='BA' />
        <RNPickerSelect.Item label='CE Ceará' value='CE' />
        <RNPickerSelect.Item label='DF Distrito Federal' value='DF' />
        <RNPickerSelect.Item label='ES Espírito Santo' value='ES' />
        <RNPickerSelect.Item label='GO Goiás' value='GO' />
        <RNPickerSelect.Item label='MA Maranhão' value='MA' />
        <RNPickerSelect.Item label='MT Mato Grosso' value='MT' />
        <RNPickerSelect.Item label='MS Mato Grosso do Sul' value='MS' />
        <RNPickerSelect.Item label='MG Minas Gerais' value='MG' />
        <RNPickerSelect.Item label='PA Pará' value='PA' />
        <RNPickerSelect.Item label='PB Paraíba' value='PB' />
        <RNPickerSelect.Item label='PR Paraná' value='PR' />
        <RNPickerSelect.Item label='PE Pernambuco' value='PE' />
        <RNPickerSelect.Item label='PI Piauí' value='PI' />
        <RNPickerSelect.Item label='RJ Rio de Janeiro' value='RJ' />
        <RNPickerSelect.Item label='RN Rio Grande do Norte' value='RN' />
        <RNPickerSelect.Item label='RS Rio Grande do Sul' value='RS' />
        <RNPickerSelect.Item label='RO Rondônia' value='RO' />
        <RNPickerSelect.Item label='RR Roraima' value='RR' />
        <RNPickerSelect.Item label='SC Santa Catarina' value='SC' />
        <RNPickerSelect.Item label='SP São Paulo' value='SP' />
        <RNPickerSelect.Item label='SE Sergipe' value='SE' />
        <RNPickerSelect.Item label='TO Tocantins' value='TO' />
      </RNPickerSelect>
    </PickerView>
  )
}
