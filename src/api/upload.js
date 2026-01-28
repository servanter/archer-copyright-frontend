import { ElMessage } from 'element-plus'

export default {
    /**
 * 验证上传文件是否符合要求
 * @param {File} file - 需要验证的文件对象
 * @returns {boolean} 文件是否通过验证
 * @throws {Error} 当文件格式不正确时抛出错误提示
 */
    validateImageFormat(file) {
        if (!file) {
            return false;
        }
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'].includes(file.type)) {
            ElMessage.warning('图片格式不正确')
            return false
        }
        return true
  },

  /**
   * 上传成功后的处理
   * @param {Object} response - 后端返回的响应
   * @param {Object} uploadFile - 上传的文件对象
   * @returns {string} 生成的图片URL
   */
  handleUploadSuccess(response, uploadFile) {
    if (uploadFile && uploadFile.raw) {
      return response.data.url
    }
    return null
  },

  // 文件超出限制
 handleExceed() {
    ElMessage.warning('只能上传一个文件，请先删除已上传的文件')
}
}