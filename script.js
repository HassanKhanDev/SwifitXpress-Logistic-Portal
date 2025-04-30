
const main = document.getElementById('main-content');
const sidebar = document.getElementById('sidebar');
const mobileMenuButton = document.getElementById('mobile-menu-button');

// Toggle mobile menu
mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('-translate-x-full');
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && !sidebar.contains(e.target) && e.target !== mobileMenuButton && !mobileMenuButton.contains(e.target)) {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
    }
});

// Close menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
    }
});

const sections = {
    dashboard: `
        <section id="dashboard">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Dashboard Overview</h2>
          
          <div class="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            <div class="bg-white shadow p-4 rounded-lg">
              <div class="text-xs md:text-sm text-gray-500">Total Bookings</div>
              <div class="text-lg md:text-xl font-bold">12</div>
            </div>
            <div class="bg-white shadow p-4 rounded-lg">
              <div class="text-xs md:text-sm text-gray-500">Delivered</div>
              <div class="text-lg md:text-xl font-bold text-green-600">9</div>
            </div>
            <div class="bg-white shadow p-4 rounded-lg">
              <div class="text-xs md:text-sm text-gray-500">Pending</div>
              <div class="text-lg md:text-xl font-bold text-yellow-600">2</div>
            </div>
          </div>
          
          <div class="mt-6 text-base md:text-lg font-semibold text-gray-700 mb-6">
            Track performance metrics for shipments and deliveries
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold mb-3">Monthly Shipments</h3>
              <div class="chart-container">
                <canvas id="shipmentChart"></canvas>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold mb-3">Shipment Status</h3>
              <div class="chart-container">
                <canvas id="statusChart"></canvas>
              </div>
            </div>
          </div>
        </section>
      `,
    bookings: `
        <section id="bookings">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Bookings</h2>
          
          <form onsubmit="addBooking(event)" class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="bname" placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="baddress" placeholder="123 Main Street" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="email" id="bemail" placeholder="john@example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="barea" placeholder="Lahore" />
            </div>
            <div class="md:col-span-2">
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200">
                Add Booking
              </button>
            </div>
          </form>
          
          <div class="overflow-x-auto table-responsive">
            <table class="w-full bg-white shadow rounded-lg overflow-hidden">
              <thead class="bg-gray-100">
                <tr>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Address</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Area</th>
                </tr>
              </thead>
              <tbody id="bookingTable" class="divide-y divide-gray-200">
                <!-- Dummy Content -->
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Talha Bhatti</td>
                  <td class="p-3 text-sm text-gray-900">123 Main Street</td>
                  <td class="p-3 text-sm text-gray-900">talhabhatti@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Lahore</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Jane Smith</td>
                  <td class="p-3 text-sm text-gray-900">456 Elm Road</td>
                  <td class="p-3 text-sm text-gray-900">janesmith@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Karachi</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Hassan Khan</td>
                  <td class="p-3 text-sm text-gray-900">789 DHA Avenue</td>
                  <td class="p-3 text-sm text-gray-900">hassankhan@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Islamabad</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      `,
    deliveries: `
        <section id="deliveries">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Deliveries</h2>
          
          <form onsubmit="addDelivery(event)" class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="dname" placeholder="Recipient Name" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="daddress" placeholder="Delivery Address" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="email" id="demail" placeholder="recipient@example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     type="text" id="darea" placeholder="Area" />
            </div>
            <div class="md:col-span-2">
              <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition duration-200">
                Add Delivery
              </button>
            </div>
          </form>
          
          <div class="overflow-x-auto table-responsive">
            <table class="w-full bg-white shadow rounded-lg overflow-hidden">
              <thead class="bg-gray-100">
                <tr>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Address</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Area</th>
                  <th class="p-3 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody id="deliveryTable" class="divide-y divide-gray-200">
                <!-- Dummy Content -->
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Hassan Khan</td>
                  <td class="p-3 text-sm text-gray-900">987 Pine Lane</td>
                  <td class="p-3 text-sm text-gray-900">hk8273@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Lahore</td>
                  <td class="p-3 text-sm text-gray-900">
                    <button onclick="this.closest('tr').remove()" class="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Emily Davis</td>
                  <td class="p-3 text-sm text-gray-900">654 Cedar Blvd</td>
                  <td class="p-3 text-sm text-gray-900">emily@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Karachi</td>
                  <td class="p-3 text-sm text-gray-900">
                    <button onclick="this.closest('tr').remove()" class="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-3 text-sm text-gray-900">Michael</td>
                  <td class="p-3 text-sm text-gray-900">321 Birch Road</td>
                  <td class="p-3 text-sm text-gray-900">michael@email.com</td>
                  <td class="p-3 text-sm text-gray-900">Islamabad</td>
                  <td class="p-3 text-sm text-gray-900">
                    <button onclick="this.closest('tr').remove()" class="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      `,
    exceptions: `
        <section id="exceptions">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Exception Reports</h2>
          
          <form onsubmit="addException(event)" class="mb-6 bg-white p-4 md:p-6 rounded-lg shadow space-y-4 max-w-4xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                <input required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       type="text" id="trackingNumber" placeholder="Enter tracking number" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Exception Type</label>
                <select required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        id="exceptionType">
                  <option value="">Select type</option>
                  <option value="damaged">Damaged Package</option>
                  <option value="delayed">Delivery Delay</option>
                  <option value="lost">Lost Package</option>
                  <option value="incorrect">Incorrect Delivery</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        rows="4" id="exceptionDescription" placeholder="Describe the issue in detail"></textarea>
            </div>
            <div>
              <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition duration-200">
                Report Exception
              </button>
            </div>
          </form>
          
          <h3 class="text-lg md:text-xl font-semibold mb-4">Recent Exceptions</h3>
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="overflow-x-auto table-responsive">
              <table class="w-full">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-3 text-left text-sm font-medium text-gray-700">Tracking #</th>
                    <th class="p-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th class="p-3 text-left text-sm font-medium text-gray-700">Description</th>
                    <th class="p-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody id="exceptionTable" class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="p-3 text-sm text-gray-900">SWX-789456</td>
                    <td class="p-3 text-sm text-gray-900">Delivery Delay</td>
                    <td class="p-3 text-sm text-gray-900">Package delayed due to weather conditions</td>
                    <td class="p-3 text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="p-3 text-sm text-gray-900">SWX-123456</td>
                    <td class="p-3 text-sm text-gray-900">Damaged Package</td>
                    <td class="p-3 text-sm text-gray-900">Package arrived with torn packaging and missing items</td>
                    <td class="p-3 text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      `,
    reports: `
        <section id="reports">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Reports & Analytics</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold mb-3">Monthly Performance</h3>
              <div class="chart-container">
                <canvas id="monthlyPerformanceChart"></canvas>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold mb-3">Delivery Success Rate</h3>
              <div class="chart-container">
                <canvas id="successRateChart"></canvas>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow mb-6">
            <h3 class="font-semibold mb-3">Yearly Comparison</h3>
            <div class="chart-container">
              <canvas id="yearlyComparisonChart"></canvas>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg md:text-xl font-semibold mb-3">Summary Reports</h3>
            <div class="space-y-4">
              <div class="border-b pb-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <i class="ph ph-file-text text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">2024 Annual Report</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      15,000 shipments processed across 100+ zones with 95% on-time delivery rate.
                    </p>
                  </div>
                </div>
              </div>
              <div class="border-b pb-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <i class="ph ph-chart-line-up text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Top Performing Cities</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      Lahore (98% success), Karachi (94% success), Islamabad (96% success)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                    <i class="ph ph-trend-up text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Improvement Areas</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      Rural deliveries showing 12% lower success rate than urban areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
    reviews: `
        <section id="reviews">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Customer Reviews</h2>
          
          <div class="bg-white p-4 md:p-6 rounded-lg shadow mb-6 max-w-4xl mx-auto">
            <h3 class="text-lg font-semibold mb-3">Submit Your Review</h3>
            <form onsubmit="submitReview(event)" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input required type="text" id="reviewerName" 
                       class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="Enter your name">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                <input required type="text" id="reviewTracking" 
                       class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="Enter tracking number">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div class="flex space-x-1" id="starRating">
                  <i class="far fa-star text-2xl md:text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition" data-rating="1"></i>
                  <i class="far fa-star text-2xl md:text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition" data-rating="2"></i>
                  <i class="far fa-star text-2xl md:text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition" data-rating="3"></i>
                  <i class="far fa-star text-2xl md:text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition" data-rating="4"></i>
                  <i class="far fa-star text-2xl md:text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition" data-rating="5"></i>
                </div>
                <input type="hidden" id="ratingValue" value="0" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea required id="reviewText" 
                          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows="4" placeholder="Share your experience"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200">
                Submit Review
              </button>
            </form>
          </div>
          
          <h3 class="text-lg md:text-xl font-semibold mb-4">Customer Feedback</h3>
          <div class="space-y-4" id="reviewsContainer">
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex justify-between items-start">
                <h4 class="font-medium text-gray-900">Ahmed Khan</h4>
                <div class="text-yellow-400 flex">
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1 mb-2">Tracking #SWX-789123</p>
              <p class="text-sm md:text-base text-gray-700">
                Excellent service! My package arrived a day earlier than expected. The delivery person was very professional.
              </p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex justify-between items-start">
                <h4 class="font-medium text-gray-900">Fatima Ali</h4>
                <div class="text-yellow-400 flex">
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="far fa-star text-sm md:text-base"></i>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1 mb-2">Tracking #SWX-456789</p>
              <p class="text-sm md:text-base text-gray-700">
                Good service overall, but the package was slightly delayed. Customer support was helpful when I called.
              </p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="flex justify-between items-start">
                <h4 class="font-medium text-gray-900">Bilal Ahmed</h4>
                <div class="text-yellow-400 flex">
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="fas fa-star text-sm md:text-base"></i>
                  <i class="far fa-star text-sm md:text-base"></i>
                  <i class="far fa-star text-sm md:text-base"></i>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1 mb-2">Tracking #SWX-123789</p>
              <p class="text-sm md:text-base text-gray-700">
                Average experience. The delivery was on time but the packaging was slightly damaged.
              </p>
            </div>
          </div>
        </section>
      `,
    contact: `
        <section id="contact">
          <h2 class="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 class="text-lg font-semibold mb-3">Send us a message</h3>
              <form class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                         type="text" placeholder="Your Name" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                         type="email" placeholder="Your Email" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            rows="4" placeholder="Your Message"></textarea>
                </div>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200">
                  Send Message
                </button>
              </form>
            </div>
            
            <div class="space-y-6">
              <div class="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-3">Contact Information</h3>
                <div class="space-y-3">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 h-6 w-6 text-blue-600">
                      <i class="ph ph-map-pin"></i>
                    </div>
                    <p class="ml-3 text-sm text-gray-700">
                      123 Courier Plaza, Main Boulevard, Lahore, Pakistan
                    </p>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 h-6 w-6 text-blue-600">
                      <i class="ph ph-phone"></i>
                    </div>
                    <p class="ml-3 text-sm text-gray-700">
                      +92 42 1234567
                    </p>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 h-6 w-6 text-blue-600">
                      <i class="ph ph-envelope"></i>
                    </div>
                    <p class="ml-3 text-sm text-gray-700">
                      info@swiftxpress.com
                    </p>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 h-6 w-6 text-blue-600">
                      <i class="ph ph-clock"></i>
                    </div>
                    <p class="ml-3 text-sm text-gray-700">
                      Mon-Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-3">Our Locations</h3>
                <div id="map" style="height: 300px; width: 100%; border-radius: 8px;"></div>
              </div>
            </div>
          </div>
        </section>
      `,
    about: `
        <section id="about" class="max-w-4xl mx-auto">
          <h2 class="text-xl md:text-2xl font-bold mb-4">About SwiftXpress</h2>
          
          <div class="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
            <h3 class="text-lg font-semibold mb-3">Our Story</h3>
            <p class="text-gray-700 mb-4">
              Founded in 2020, SwiftXpress has rapidly grown to become one of Pakistan's leading courier and logistics providers. 
              What started as a small delivery service in Lahore has expanded to cover all major cities across the country, 
              with a network of over 50 branches and 500+ delivery personnel.
            </p>
            <p class="text-gray-700">
              Our mission is to provide reliable, fast, and affordable delivery services to both businesses and individuals, 
              leveraging technology to create seamless customer experiences.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 class="text-lg font-semibold mb-3">Our Values</h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <i class="ph ph-rocket text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Speed</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      We prioritize fast and efficient deliveries without compromising on service quality.
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <i class="ph ph-shield-check text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Reliability</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      Your packages are handled with care and delivered securely every time.
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                    <i class="ph ph-users text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Customer Focus</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      We put our customers first, with 24/7 support and personalized service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-4 md:p-6 rounded-lg shadow">
              <h3 class="text-lg font-semibold mb-3">Key Statistics</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Cities Served</span>
                  <span class="font-bold text-blue-600">25+</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Daily Deliveries</span>
                  <span class="font-bold text-blue-600">5,000+</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">On-time Delivery Rate</span>
                  <span class="font-bold text-blue-600">96%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Customer Satisfaction</span>
                  <span class="font-bold text-blue-600">94%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-700">Team Members</span>
                  <span class="font-bold text-blue-600">750+</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-4 md:p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-3">Our Team</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" class="h-full w-full object-cover">
                </div>
                <h4 class="font-medium">Talha Bhatti</h4>
                <p class="text-sm text-gray-600">CEO & Founder</p>
              </div>
              <div class="text-center">
                <div class="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" class="h-full w-full object-cover">
                </div>
                <h4 class="font-medium">Ayesha Khan</h4>
                <p class="text-sm text-gray-600">Operations Director</p>
              </div>
              <div class="text-center">
                <div class="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Team Member" class="h-full w-full object-cover">
                </div>
                <h4 class="font-medium">Ali Raza</h4>
                <p class="text-sm text-gray-600">Technology Lead</p>
              </div>
              <div class="text-center">
                <div class="h-20 w-20 mx-auto rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Team Member" class="h-full w-full object-cover">
                </div>
                <h4 class="font-medium">Fatima Ahmed</h4>
                <p class="text-sm text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </section>
      `
};

// Show default section on load
function showSection(sectionId) {
    main.innerHTML = sections[sectionId];

    // Close mobile menu if open
    if (window.innerWidth < 768) {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
    }

    // Initialize charts and maps for the current section
    setTimeout(() => {
        if (sectionId === 'dashboard') {
            initDashboardCharts();
        } else if (sectionId === 'reports') {
            initReportCharts();
        } else if (sectionId === 'contact') {
            initMap();
        }
    }, 50);
}

// Initialize dashboard charts
function initDashboardCharts() {
    // Monthly Shipments Chart
    const shipmentCtx = document.getElementById('shipmentChart').getContext('2d');
    new Chart(shipmentCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Shipments',
                data: [120, 190, 170, 220, 250, 210, 300],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Shipment Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Delivered', 'In Transit', 'Pending', 'Exceptions'],
            datasets: [{
                data: [65, 15, 15, 5],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Initialize report charts
function initReportCharts() {
    // Monthly Performance Chart
    const monthlyPerfCtx = document.getElementById('monthlyPerformanceChart').getContext('2d');
    new Chart(monthlyPerfCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'On Time',
                data: [95, 93, 96, 97, 95, 96],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
            }, {
                label: 'Delayed',
                data: [5, 7, 4, 3, 5, 4],
                backgroundColor: 'rgba(245, 158, 11, 0.8)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Success Rate Chart
    const successRateCtx = document.getElementById('successRateChart').getContext('2d');
    new Chart(successRateCtx, {
        type: 'radar',
        data: {
            labels: ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Peshawar', 'Multan'],
            datasets: [{
                label: 'Success Rate %',
                data: [98, 94, 96, 92, 90, 93],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 80,
                    suggestedMax: 100
                }
            }
        }
    });

    // Yearly Comparison Chart
    const yearlyCompCtx = document.getElementById('yearlyComparisonChart').getContext('2d');
    new Chart(yearlyCompCtx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: '2023',
                data: [85, 88, 90, 92],
                borderColor: 'rgba(156, 163, 175, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3
            }, {
                label: '2024',
                data: [90, 93, 95, 96],
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100
                }
            }
        }
    });
}

// Initialize map for contact section
function initMap() {
    const map = L.map('map').setView([31.5204, 74.3587], 13); // Lahore coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for office locations
    L.marker([31.5204, 74.3587]).addTo(map)
        .bindPopup("<b>SwiftXpress Head Office</b><br>123 Courier Plaza, Lahore");

    L.marker([31.4902, 74.3171]).addTo(map)
        .bindPopup("<b>SwiftXpress DHA Branch</b><br>45 Commercial Area, DHA");

    L.marker([31.5526, 74.3236]).addTo(map)
        .bindPopup("<b>SwiftXpress Gulberg Branch</b><br>78 Main Boulevard, Gulberg");
}

// Form submission handlers
function addBooking(e) {
    e.preventDefault();
    const name = document.getElementById('bname').value;
    const address = document.getElementById('baddress').value;
    const email = document.getElementById('bemail').value;
    const area = document.getElementById('barea').value;

    const table = document.getElementById('bookingTable');
    const row = table.insertRow();

    row.innerHTML = `
        <td class="p-3 text-sm text-gray-900">${name}</td>
        <td class="p-3 text-sm text-gray-900">${address}</td>
        <td class="p-3 text-sm text-gray-900">${email}</td>
        <td class="p-3 text-sm text-gray-900">${area}</td>
      `;

    // Reset form
    e.target.reset();
    alert('Booking added successfully!');
}

function addDelivery(e) {
    e.preventDefault();
    const name = document.getElementById('dname').value;
    const address = document.getElementById('daddress').value;
    const email = document.getElementById('demail').value;
    const area = document.getElementById('darea').value;

    const table = document.getElementById('deliveryTable');
    const row = table.insertRow();

    row.innerHTML = `
        <td class="p-3 text-sm text-gray-900">${name}</td>
        <td class="p-3 text-sm text-gray-900">${address}</td>
        <td class="p-3 text-sm text-gray-900">${email}</td>
        <td class="p-3 text-sm text-gray-900">${area}</td>
        <td class="p-3 text-sm text-gray-900">
          <button onclick="this.closest('tr').remove()" class="text-red-500 hover:text-red-700">
            Delete
          </button>
        </td>
      `;

    // Reset form
    e.target.reset();
    alert('Delivery added successfully!');
}

function addException(e) {
    e.preventDefault();
    const tracking = document.getElementById('trackingNumber').value;
    const type = document.getElementById('exceptionType').value;
    const description = document.getElementById('exceptionDescription').value;

    const typeText = {
        'damaged': 'Damaged Package',
        'delayed': 'Delivery Delay',
        'lost': 'Lost Package',
        'incorrect': 'Incorrect Delivery',
        'other': 'Other'
    }[type];

    const table = document.getElementById('exceptionTable');
    const row = table.insertRow();

    row.innerHTML = `
        <td class="p-3 text-sm text-gray-900">${tracking}</td>
        <td class="p-3 text-sm text-gray-900">${typeText}</td>
        <td class="p-3 text-sm text-gray-900">${description}</td>
        <td class="p-3 text-sm text-gray-900">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        </td>
      `;

    // Reset form
    e.target.reset();
    alert('Exception reported successfully! Our team will contact you shortly.');
}

function submitReview(e) {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value;
    const tracking = document.getElementById('reviewTracking').value;
    const rating = document.getElementById('ratingValue').value;
    const review = document.getElementById('reviewText').value;

    // Create stars HTML based on rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating
            ? '<i class="fas fa-star text-sm md:text-base"></i>'
            : '<i class="far fa-star text-sm md:text-base"></i>';
    }

    const container = document.getElementById('reviewsContainer');
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'bg-white p-4 rounded-lg shadow';
    reviewDiv.innerHTML = `
        <div class="flex justify-between items-start">
          <h4 class="font-medium text-gray-900">${name}</h4>
          <div class="text-yellow-400 flex">
            ${stars}
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-1 mb-2">Tracking #${tracking}</p>
        <p class="text-sm md:text-base text-gray-700">
          ${review}
        </p>
      `;

    // Insert at the top of the reviews
    container.insertBefore(reviewDiv, container.firstChild);

    // Reset form
    e.target.reset();
    document.getElementById('ratingValue').value = '0';
    resetStars();
    alert('Thank you for your review!');
}

// Star rating functionality
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;

            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('mouseover', function () {
            const rating = parseInt(this.getAttribute('data-rating'));

            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                }
            });
        });

        star.addEventListener('mouseout', function () {
            const currentRating = parseInt(ratingInput.value);

            stars.forEach((s, index) => {
                if (index >= currentRating) {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
});

function resetStars() {
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
}

// Show dashboard by default on load
window.onload = function () {
    showSection('dashboard');

    // Close mobile menu if resized to desktop
    if (window.innerWidth >= 768) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
    }
};
