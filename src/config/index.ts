export default {
    storage_tag: 'SHRQ_',
    baseUrl: '/rest',
    /** 是否开启权限验证 */
    validationRole: false,
    isProd: process.env.NODE_ENV === 'production'
}
