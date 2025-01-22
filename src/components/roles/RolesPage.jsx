import React, { useState, useEffect } from "react"
import { Table, Button, Modal, Form, Input, message } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const RolesPage = () => {
  const [roles, setRoles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/roles")
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      message.error("Failed to load roles")
    }
  }

  const onFinish = async (values) => {
    try {
      const url = editingId ? `http://localhost:8080/api/roles/${editingId}` : "http://localhost:8080/api/roles"

      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      message.success(`Role ${editingId ? "updated" : "created"} successfully`)
      setIsModalOpen(false)
      form.resetFields()
      setEditingId(null)
      loadRoles()
    } catch (error) {
      message.error("Operation failed")
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/roles/${id}`, {
        method: "DELETE",
      })
      message.success("Role deleted successfully")
      loadRoles()
    } catch (error) {
      message.error("Failed to delete role")
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record.id)
              form.setFieldsValue(record)
              setIsModalOpen(true)
            }}
          />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ]

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        onClick={() => {
          setEditingId(null)
          form.resetFields()
          setIsModalOpen(true)
        }}
        style={{ marginBottom: 16 }}
      >
        Add Role
      </Button>

      <Table dataSource={roles} columns={columns} rowKey="id" />

      <Modal
        title={editingId ? "Edit Role" : "Add Role"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
          setEditingId(null)
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Role Name" rules={[{ required: true, message: "Please input role name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RolesPage

