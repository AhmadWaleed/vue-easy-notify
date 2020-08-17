import { mount } from '@vue/test-utils'
import Notification from '../../src/components/Notification'

describe('Test notifications component', () => {

    it('displays messages pass as prop', () => {
        const wrapper = mount(Notification, {
            propsData: {
                message: 'test message'
            }
        })

        expect(wrapper.text()).toContain('test message')
    })

    it('displays messages with close icon by default', () => {
        const wrapper = mount(Notification, {
            propsData: {
                message: 'test message',
            }
        })


        expect(wrapper.text()).toContain('test message')
        expect(wrapper.find('.close-icon').exists()).toBe(true)
    })

    it('displays messages with hiding close icon', () => {
        const wrapper = mount(Notification, {
            propsData: {
                message: 'test message',
                showClose: false
            }
        })


        expect(wrapper.text()).toContain('test message')
        expect(wrapper.find('.close-icon').exists()).toBe(false)
    })

    it('emits close event when close icon clicked', async () => {
        const wrapper = mount(Notification, {
            propsData: {
                message: 'test message',
            }
        })

        await wrapper.find('.close-icon').trigger('click')

        expect(wrapper.emitted().close).toBeTruthy()

    })

})