import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { MenubarTabType } from '../types'

export interface MenuBarTabState {
  selectedMenubarTab: MenubarTabType
}

const initialState: MenuBarTabState = {
  selectedMenubarTab: {
    globalMenu: 'questions',
    myPageMenu: 'myQuestion',
  },
}

export const menuBarSlice = createSlice({
  name: 'menuBar',
  initialState,
  reducers: {
    changeMenubarTab: (state, action: PayloadAction<MenubarTabType>) => {
      state.selectedMenubarTab = action.payload
    },
  },
})

export const { changeMenubarTab } = menuBarSlice.actions

export const selectMenubarTab = (state: RootState): MenubarTabType => state.menuBar.selectedMenubarTab

export default menuBarSlice.reducer
