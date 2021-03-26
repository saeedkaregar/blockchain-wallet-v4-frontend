import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { AddBankStepType, OBInstitution } from 'data/types'

import {
  BankSearchInput,
  BankWrapper,
  ModalNavWithBackArrow,
  SimpleBankRow
} from '../../../components'
import {
  LinkDispatchPropsType as _LD,
  OwnProps as _O,
  SuccessStateType as _SS} from '.'

type Props = _SS & _LD & _O

const Success = (props: Props) => {
  const [banks, setBanks] = useState<OBInstitution[]>(
    props.bankCredentials.attributes.institutions
  )

  const simpleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const searchResults = props.bankCredentials.attributes.institutions.filter(
      bank => bank.name.toLowerCase().match(value.toLowerCase())
    )
    setBanks(searchResults)
  }

  return (
    <BankWrapper>
      <ModalNavWithBackArrow>
        <FormattedMessage
          id='copy.find_your_bank'
          defaultMessage='Find Your Bank'
        />
      </ModalNavWithBackArrow>
      <BankSearchInput
        onChange={simpleSearch}
        placeholder='Search'
        type='text'
      />
      {banks.map(bank => {
        return (
          <SimpleBankRow
            key={bank.id}
            institution={bank}
            onClick={() => {
              props.setYapilyBankId(bank.id)
              props.brokerageActions.setAddBankStep({
                addBankStep: AddBankStepType.ADD_BANK_AUTHORIZE
              })
            }}
          />
        )
      })}
    </BankWrapper>
  )
}

export default Success