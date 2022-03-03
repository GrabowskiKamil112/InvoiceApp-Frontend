import theme from '../theme/theme'

export const themeNavigator = (path: string) => {
    return path.split('.').reduce<any>((a, b) => {
        return a && a[b]
    }, theme)
}
