<!-- About page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>About - AutoHub</title>
    <meta name="description" content="Learn more about AutoHub, a platform for discovering and sharing Python automation scripts." />
</svelte:head>

<Header />

<main>
    <section class="page-header">
        <div class="container">
            <h1>About AutoHub</h1>
            <p>Learn more about our platform and mission</p>
        </div>
    </section>
    
    <section class="about-content py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="card mb-5">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Our Mission</h2>
                            
                            <p class="mb-3">
                                AutoHub was created with a simple mission: to provide a platform where developers can 
                                share and discover Python automation scripts that solve real-world problems.
                            </p>
                            
                            <p class="mb-3">
                                We believe in the power of automation to simplify repetitive tasks, save time, and 
                                unlock human creativity. By bringing together a community of Python enthusiasts, 
                                we aim to build a comprehensive library of high-quality scripts that anyone can use.
                            </p>
                            
                            <p>
                                Whether you're looking to automate web scraping, file operations, data processing, 
                                or API interactions, AutoHub is designed to help you find the right script for your needs.
                            </p>
                        </div>
                    </div>
                    
                    <div class="card mb-5">
                        <div class="card-body">
                            <h2 class="card-title mb-4">What We Offer</h2>
                            
                            <div class="feature-row mb-4">
                                <div class="feature-icon-wrapper">
                                    <i class="fas fa-search feature-icon"></i>
                                </div>
                                <div class="feature-content">
                                    <h3>Script Discovery</h3>
                                    <p>Easily browse and search through our curated collection of Python automation scripts, filtered by category, tags, or keywords.</p>
                                </div>
                            </div>
                            
                            <div class="feature-row mb-4">
                                <div class="feature-icon-wrapper">
                                    <i class="fas fa-code feature-icon"></i>
                                </div>
                                <div class="feature-content">
                                    <h3>Code Preview</h3>
                                    <p>Review the source code directly in your browser before downloading, ensuring it meets your specific requirements.</p>
                                </div>
                            </div>
                            
                            <div class="feature-row mb-4">
                                <div class="feature-icon-wrapper">
                                    <i class="fas fa-upload feature-icon"></i>
                                </div>
                                <div class="feature-content">
                                    <h3>Script Sharing</h3>
                                    <p>Share your own automation scripts with our community, providing solutions to common problems and helping others.</p>
                                </div>
                            </div>
                            
                            <div class="feature-row">
                                <div class="feature-icon-wrapper">
                                    <i class="fas fa-users feature-icon"></i>
                                </div>
                                <div class="feature-content">
                                    <h3>Community</h3>
                                    <p>Join a community of Python developers and automation enthusiasts sharing knowledge and best practices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Contact Us</h2>
                            
                            <p class="mb-4">
                                Have questions, suggestions, or feedback? We'd love to hear from you!
                            </p>
                            
                            <div class="contact-info">
                                <div class="contact-item">
                                    <i class="fas fa-envelope contact-icon"></i>
                                    <span>contact@autohub.example.com</span>
                                </div>
                                
                                <div class="contact-item">
                                    <i class="fab fa-github contact-icon"></i>
                                    <span>github.com/autohub</span>
                                </div>
                                
                                <div class="contact-item">
                                    <i class="fab fa-twitter contact-icon"></i>
                                    <span>@AutoHubPython</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }
    
    .page-header {
        padding: 3rem 0;
        background-color: var(--gray-800);
        color: var(--white);
    }
    
    .page-header h1 {
        margin-bottom: 0.5rem;
    }
    
    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }
    
    .feature-row {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
    }
    
    .feature-icon-wrapper {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .feature-icon {
        color: var(--white);
        font-size: 1.5rem;
    }
    
    .feature-content h3 {
        margin-bottom: 0.5rem;
    }
    
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .contact-icon {
        width: 30px;
        height: 30px;
        background-color: var(--primary);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
        font-size: 1rem;
        padding: 0.5rem;
    }
</style>
