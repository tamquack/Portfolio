import { test, expect } from '@playwright/test'

test.describe('Portfolio Navigation', () => {

    test('page loads and navbar is visible', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('nav')).toBeVisible()
        await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Tech Stack' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()
    })

    test('about section is visible', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('#about')).toBeVisible()
        await expect(page.locator('text=Hi, I am Tamson')).toBeVisible()
    })

    test('techstack section is visible', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('#techstack')).toBeVisible()
    })

    test('projects section is visible', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('#projects')).toBeVisible()
    })

    test('contact section is visible', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('#contact')).toBeVisible()
    })

})

test.describe('Contact Form', () => {

    test('form fields are present', async ({ page }) => {
        await page.goto('http://localhost')
        await expect(page.locator('input[name="name"]')).toBeVisible()
        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('textarea[name="message"]')).toBeVisible()
        await expect(page.locator('button[type="submit"]')).toBeVisible()
    })

    test('form submits successfully', async ({ page }) => {
        await page.goto('http://localhost')
        await page.fill('input[name="name"]', 'Test User')
        await page.fill('input[name="email"]', 'test@example.com')
        await page.fill('textarea[name="message"]', 'This is a test message from Playwright')
        await page.click('button[type="submit"]')
        await expect(page.locator('text=Message sent')).toBeVisible({ timeout: 5000 })
    })

    test('form rejects invalid email', async ({ page }) => {
        await page.goto('http://localhost')
        await page.fill('input[name="name"]', 'Test User')
        await page.fill('input[name="email"]', 'notanemail')
        await page.fill('textarea[name="message"]', 'Test message')
        await page.click('button[type="submit"]')
        await expect(page.locator('text=valid email')).toBeVisible({ timeout: 3000 })
    })

})