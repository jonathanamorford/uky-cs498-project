const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Course', () => {
    const CourseController = require('../../../main/controllers/CourseController')

    // this is ran after each unit test
    afterEach(() => {
        // this is needed to restore the CoursePortfolio model back to it's original state
        // we don't want to break all future unit tests
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        const CourseController = require('../../../main/controllers/CourseController')
        const TestCourseController = new CourseController()
        let department_id = '1'
        let course_number = '101'
        expected_payload = {
            department_id: parseInt(department_id),
            number: parseInt(course_number)
        }

        // Act
        let payload = await TestCourseController.generateCoursePayload(department_id, course_number)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '1'
        let course_number = '101'
        let course_expected = {
            id: 1,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }

        sandbox.stub(Course, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    department_id: parseInt(department_id),
                    course_number: parseInt(course_number)
                })
            })
        })

        let TestCourseController = new CourseController()
        
        // Act
        let course_retrieved = await TestCourseController.getByAttributes(department_id, course_number)

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })

    it('gets by id', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let id = 1
        let department_id = '1'
        let course_number = '101'
        let course_expected = {
            id: id,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }

        sandbox.stub(Course, "query").returns({
            findById: sandbox.stub().returns({
                id: id,
                department_id: parseInt(department_id),
                course_number: parseInt(course_number)
            })
        })

        let TestCourseController = new CourseController()
        
        // Act
        let course_retrieved = await TestCourseController.getById(id)

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected) 
    })

    it('inserts', async () => {
        // Arrange
        const CourseController = require('../../../main/controllers/CourseController')
        const Course = require('../../../main/models/Course')
        let department_id = '1'
        let course_number = '101'
        course_expected = {
            id: 1,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }        

        sandbox.stub(Course, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                department_id: parseInt(department_id),
                course_number: parseInt(course_number)
            })
        })

        let TestCourseController = new CourseController()
        
        // Act
        let course_inserted = await TestCourseController.insert()

        // Assert
        expect(course_inserted).to.deep.equal(course_expected)
    })

    it('updates by id', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '2'
        let course_number = '202'
        let course_expected = {
            id: 2,
            department_id: parseInt(department_id),
            course_number: parseInt(course_number)
        }

        sandbox.stub(Course, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: 2,
                department_id: parseInt(department_id),
                course_number: parseInt(course_number)
            })
        })

        let TestCourseController = new CourseController(department_id, course_number)
        
        // Act
        let course_retrieved = await TestCourseController.updateById()

        // Assert
        expect(course_retrieved).to.deep.equal(course_expected)  
    })

    it('delete by attributes', async () => {        
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '1'
        let course_number = '101'
        sandbox.stub(Course, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(1)
                })
            })
        })

        let TestCourseController = new CourseController()

        // Act
        let courseDeleted = await TestCourseController.deleteByAttributes(department_id, course_number)

        // Assert
        expect(courseDeleted).to.equal(true)
    })

    it('delete returns false if invalid attributes', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let department_id = '-1'
        let course_number = '-1'
        sandbox.stub(Course, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(0)
                })
            })
        })

        let TestCourseController = new CourseController()

        // Act
        let courseDeleted = await TestCourseController.deleteByAttributes(department_id, course_number)

        // Assert
        expect(courseDeleted).to.equal(false)
    })

    it('delete by id', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let id = 1
        sandbox.stub(Course, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        let TestCourseController = new CourseController()

        // Act
        let courseDeleted = await TestCourseController.deleteById(id)

        // Assert
        expect(courseDeleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        const Course = require('../../../main/models/Course')
        let id = 404
        sandbox.stub(Course, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        let TestCourseController = new CourseController()

        // Act
        let courseDeleted = await TestCourseController.deleteById(id)

        // Assert
        expect(courseDeleted).to.equal(false)

    })
})