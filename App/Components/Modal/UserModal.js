/** @format */

import React, { PureComponent } from 'react'
import { ModalBox } from '@components'
import { LogIn } from '@container'
import { Events, Config } from '@common'

export default class UserModal extends PureComponent {
  componentDidMount() {
    this.modalUserClick = Events.onOpenUserModal(this.open.bind(this))
    this.modalUserClose = Events.onCloseUserModal(this.close.bind(this))
  }

  componentWillUnMount() {
    this.modalUserClick.remove()
    // this.modalUserClose.remove();
  }

  open = () => {
    if (typeof this.refs.modal !== 'undefined') {
      this.refs.modal.openModal()
    }
  }

  close = () => {
    if (typeof this.refs.modal !== 'undefined') {
      this.refs.modal.closeModal()
    }
  }

  render() {
    return (
      <ModalBox ref="modal" type="readlater" hideClose={Config.RequiredLogin}>
        <LogIn />
      </ModalBox>
    )
  }
}
