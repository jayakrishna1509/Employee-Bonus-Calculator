let employees = [];
        const bonusCalculator = {
            name: 'Standard Calculator',
            calculateBonus: function(employee) {
                return employee.bonus;
            }
        };

        const premiumCalculator = {
            name: 'Premium Calculator',
            calculateBonus: function(employee) {
                return employee.bonus * 1.5;
            }
        };

        const executiveCalculator = {
            name: 'Executive Calculator',
            calculateBonus: function(employee) {
                return employee.bonus * 2;
            }
        };

        function processBonusCalculation(minSalary) {
            if (employees.length === 0) {
                alert('Please add employees first');
                return;
            }

            const highEarners = employees.filter(emp => emp.salary > minSalary);

            if (highEarners.length === 0) {
                document.getElementById('results').innerHTML = `
                    <div class="results-section">
                        <div class="results-title">Bonus Results</div>
                        <div class="empty-state">No employees qualify for bonuses (salary must be > ₹${minSalary.toLocaleString('en-IN')})</div>
                    </div>
                `;
                return;
            }

            const employeesWithBonus = highEarners.map(emp => ({
                ...emp,
                calculatedBonus: this.calculateBonus(emp)
            }));

            const totalBonus = employeesWithBonus.reduce((total, emp) => 
                total + emp.calculatedBonus, 0
            );

            displayResults(employeesWithBonus, totalBonus, this.name);
        }

        const calculateBonuses = (minSalary = 45000) => {
            if (employees.length === 0) {
                alert('Please add employees first');
                return;
            }

            console.log('Demonstrating call, apply, and bind');
            
            console.log('1. Using call() with bonusCalculator');
            processBonusCalculation.call(bonusCalculator, minSalary);
    
            // Uncomment to see apply() in action
            // console.log('2. Using apply() with premiumCalculator');
            // processBonusCalculation.apply(premiumCalculator, [minSalary]);
        
            // Uncomment to see bind() in action
            // console.log('3. Using bind() with executiveCalculator');
            // const boundCalculate = processBonusCalculation.bind(executiveCalculator);
            // boundCalculate(minSalary);
        };

        const addEmployee = () => {
            const name = document.getElementById('empName').value.trim();
            const salary = parseFloat(document.getElementById('empSalary').value);
            const bonusValue = parseFloat(document.getElementById('bonusValue').value);

            if (!name || isNaN(salary) || salary <= 0) {
                alert('Please enter valid employee details');
                return;
            }

            if (isNaN(bonusValue) || bonusValue <= 0) {
                alert('Please enter a valid bonus value');
                return;
            }

            const newEmployee = {
                id: Date.now(),
                name,
                salary,
                bonus: bonusValue
            };

            employees = [...employees, newEmployee];
            displayEmployees();
            
            document.getElementById('empName').value = '';
            document.getElementById('empSalary').value = '';
            document.getElementById('bonusValue').value = '';
        };

        const removeEmployee = (id) => {
            employees = employees.filter(emp => emp.id !== id);
            displayEmployees();
            document.getElementById('results').innerHTML = '';
        };

        const displayEmployees = () => {
            const list = document.getElementById('employeesList');
            
            if (employees.length === 0) {
                list.innerHTML = '<div class="empty-state">No employees added yet</div>';
                return;
            }

            list.innerHTML = employees.map(emp => `
                <div class="employee-card">
                    <div class="employee-info">
                        <div class="employee-name">${emp.name}</div>
                        <div class="employee-salary">Salary: ₹${emp.salary.toLocaleString('en-IN')} | Bonus: ₹${emp.bonus.toLocaleString('en-IN')}</div>
                    </div>
                    <button class="remove-btn" onclick="removeEmployee(${emp.id})">Remove</button>
                </div>
            `).join('');
        };

        const displayResults = (employeesWithBonus, totalBonus, calculatorName) => {
            const resultsHTML = `
                <div class="results-section">
                    <div class="results-title">Bonus Calculation Results</div>
                    <div class="method-info">
                        Calculator Used: ${calculatorName}
                    </div>
                    ${employeesWithBonus.map(({ name, salary, calculatedBonus }) => `
                        <div class="result-item">
                            <div class="result-text">
                                <strong>${name}</strong> earns ₹${salary.toLocaleString('en-IN')} and got a bonus of ₹${calculatedBonus.toLocaleString('en-IN')}
                            </div>
                        </div>
                    `).join('')}
                    <div class="total-bonus">
                        💰 Total Bonus Given: ₹${totalBonus.toLocaleString('en-IN')}
                    </div>
                </div>
            `;

            document.getElementById('results').innerHTML = resultsHTML;
        };

        const loadSampleData = () => {
            employees = [
                { id: 1, name: 'Alice', salary: 50000, bonus: 5000 },
                { id: 2, name: 'Bob', salary: 40000, bonus: 4000 },
                { id: 3, name: 'Charlie', salary: 60000, bonus: 6000 },
            ];
            displayEmployees();
            document.getElementById('results').innerHTML = '';
        };

        const clearAll = () => {
            employees = [];
            displayEmployees();
            document.getElementById('results').innerHTML = '';
        };

        displayEmployees();